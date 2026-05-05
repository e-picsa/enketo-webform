import {
  getTimezoneOffsetAsTime,
  toISOLocalString,
} from "../../../openrosa/date-extensions";
import $ from "jquery";
import Widget from "../../js/widget";
import types from "../../js/types";
import { isNumber, getPasteData } from "../../js/utils";
import { os, browser } from "../../js/sniffer";

interface DateWidgetSettings {
  format: string;
  type: string;
  placeholder: string;
  inputType: "date" | "datetime-local" | "time";
}

/**
 * Unified widget for handling native HTML5 date, datetime-local, and time inputs.
 *
 * @augments Widget
 */
class DateWidget extends Widget {
  $fakeInput!: JQuery<HTMLInputElement>;
  settings!: DateWidgetSettings;

  /**
   * @type {string}
   */
  static get selector() {
    return '.question input[type="date"], .question input[type="datetime-local"], .question input[type="time"]';
  }

  /**
   * @type {boolean}
   */
  static condition() {
    return true; // Universally handle native inputs
  }

  _init() {
    const el = this.element as HTMLInputElement;
    const inputType = el.getAttribute("type") as
      | "date"
      | "datetime-local"
      | "time";

    if (inputType === "datetime-local") {
      this.settings = {
        format: "yyyy-mm-ddThh:mm",
        type: "datetime-local",
        placeholder: "yyyy-mm-ddThh:mm",
        inputType,
      };
    } else if (inputType === "time") {
      this.settings = {
        format: "hh:mm",
        type: "time",
        placeholder: "hh:mm",
        inputType,
      };
    } else {
      // type="date"
      this.settings = this.props.appearances.includes("year")
        ? {
            format: "yyyy",
            type: "number",
            placeholder: "yyyy",
            inputType,
          }
        : this.props.appearances.includes("month-year")
          ? {
              format: "yyyy-mm",
              type: "month",
              placeholder: "yyyy-mm",
              inputType,
            }
          : {
              format: "yyyy-mm-dd",
              type: "date",
              placeholder: "yyyy-mm-dd",
              inputType,
            };
    }

    this.$fakeInput = this._createFakeInput(this.settings);

    this._setChangeHandler(this.$fakeInput);
    this._setFocusHandler(this.$fakeInput);
    this._setResetHandler(this.$fakeInput);

    this.enable();
    this.value = this.originalInputValue;

    if (this.props.readonly) {
      this.disable();
    }
  }

  /**
   * Creates fake input elements
   *
   * @param {DateWidgetSettings} settings - The widget settings
   * @return {JQuery<HTMLInputElement>} The jQuery-wrapped fake input element
   */
  _createFakeInput(settings: DateWidgetSettings): JQuery<HTMLInputElement> {
    const $original = $(this.element);
    const widgetClass =
      settings.inputType === "datetime-local"
        ? "datetimepicker"
        : settings.inputType === "time"
          ? "timepicker"
          : "date";

    const $fakeContainer = $(
      `<div class="widget ${widgetClass}"><input class="ignore input-small" type="${settings.type}" placeholder="${settings.placeholder}" /></div>`,
    ).append(this.resetButtonHtml as any);
    const $fakeInput = $fakeContainer.find("input") as JQuery<HTMLInputElement>;

    if (settings.type === "number") {
      $fakeInput.attr("min", "1900");
      $fakeInput.attr("max", "2100");
    }

    $original.hide().before($fakeContainer);

    // Open native picker when clicking anywhere in the input
    $fakeInput.on("click", (event) => {
      const input = event.currentTarget as HTMLInputElement;
      try {
        if ("showPicker" in input && typeof input.showPicker === "function") {
          input.showPicker();
        }
      } catch (e) {
        // Ignore if browser throws error (e.g., if not transiently activated)
      }
    });

    return $fakeInput;
  }

  /**
   * Copy manual changes to original input field
   *
   * @param {JQuery<HTMLInputElement>} $fakeInput - Fake input element
   */
  _setChangeHandler($fakeInput: JQuery<HTMLInputElement>) {
    const { settings } = this;

    $fakeInput.on("change paste", (e: JQuery.Event) => {
      let convertedValue = "";
      let value =
        e.type === "paste"
          ? getPasteData((e.originalEvent as any) ?? e)
          : ($fakeInput.val() as string);

      if (value && value.length > 0) {
        if (settings.inputType === "date") {
          if (isNumber(value) && settings.format !== "yyyy") {
            convertedValue = "";
          } else {
            value = this._toActualDate(value);
            convertedValue = types.date.convert(value);
          }
        } else if (settings.inputType === "datetime-local") {
          convertedValue = types.datetime.convert(value);
        } else if (settings.inputType === "time") {
          convertedValue = types.time.convert(value);
        }
      }

      this._updateFakeInputValue(convertedValue);

      if (this.originalInputValue !== convertedValue) {
        this.originalInputValue = convertedValue;
      }

      return false;
    });
  }

  /**
   * Reset button handler
   *
   * @param {JQuery<HTMLInputElement>} $fakeInput - Fake input element
   */
  _setResetHandler($fakeInput: JQuery<HTMLInputElement>) {
    $fakeInput.next(".btn-reset").on("click", () => {
      if (this.originalInputValue) {
        this.originalInputValue = "";
        this.value = "";
      }
    });
  }

  /**
   * Handler for focus events.
   *
   * @param {JQuery<HTMLInputElement>} $fakeInput - Fake input element
   */
  _setFocusHandler($fakeInput: JQuery<HTMLInputElement>) {
    $(this.element).on("applyfocus", () => {
      $fakeInput[0].focus();
    });
  }

  /**
   * Updates fake input value visually based on the actual value.
   *
   * @param {string} date - actual date string
   */
  _updateFakeInputValue(date: string) {
    if (this.settings.inputType === "date") {
      this.$fakeInput.val(this._toDisplayDate(date));
    } else if (this.settings.inputType === "datetime-local") {
      let val = date ? toISOLocalString(new Date(date)) : "";
      this.$fakeInput.val(val ? val.substring(0, 16) : ""); // datetime-local expects yyyy-MM-ddThh:mm
    } else if (this.settings.inputType === "time") {
      this.$fakeInput.val(date ? date.substring(0, 5) : ""); // time expects hh:mm
    }
  }

  /**
   * @param {string} [date] - date
   * @return {string} the actual date
   */
  _toActualDate(date = ""): string {
    date = date.trim();
    return date && this.settings.format === "yyyy" && date.length < 5
      ? `${date}-01-01`
      : date && this.settings.format === "yyyy-mm" && date.length < 8
        ? `${date}-01`
        : date;
  }

  /**
   * @param {string} [date] - date
   * @return {string} the display date
   */
  _toDisplayDate(date = ""): string {
    date = date.trim();
    return date && this.settings.format === "yyyy"
      ? date.substring(0, 4)
      : this.settings.format === "yyyy-mm"
        ? date.substring(0, 7)
        : date;
  }

  disable() {
    this.$fakeInput.prop("disabled", true);
    this.$fakeInput.next(".btn-reset").prop("disabled", true);
  }

  enable() {
    this.$fakeInput.prop("disabled", false);
    this.$fakeInput.next(".btn-reset").prop("disabled", false);
  }

  update() {
    this.value = (this.element as HTMLInputElement).value;
  }

  get originalInputValue(): string {
    const originalInputValue = super.originalInputValue;
    if (!originalInputValue) {
      return "";
    }
    if (this.settings.inputType === "datetime-local") {
      return toISOLocalString(new Date(originalInputValue));
    }
    return originalInputValue;
  }

  set originalInputValue(value: any) {
    super.originalInputValue = value;
  }

  /**
   * @type {string}
   */
  get displayedValue(): string {
    return (this.question.querySelector(".widget input") as HTMLInputElement)
      .value;
  }

  /**
   * @type {string}
   */
  get value() {
    if (this.settings.inputType === "date") {
      return this._toActualDate(this.displayedValue);
    } else if (this.settings.inputType === "datetime-local") {
      return this.displayedValue
        ? toISOLocalString(new Date(this.displayedValue))
        : "";
    } else {
      return this.displayedValue;
    }
  }

  set value(value: any) {
    this._updateFakeInputValue(value as string);
  }
}

export default DateWidget;
