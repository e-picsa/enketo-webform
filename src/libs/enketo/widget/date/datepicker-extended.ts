import $ from "jquery";
import Widget from "../../js/widget";
import types from "../../js/types";
import { isNumber, getPasteData } from "../../js/utils";

/**
 * Extends native HTML5 date inputs for year and month-year appearances.
 *
 * @augments Widget
 */
class DatepickerExtended extends Widget {
  /**
   * @type {string}
   */
  static get selector() {
    return '.question input[type="date"]';
  }

  /**
   * @type {boolean}
   */
  static condition() {
    // We always instantiate this widget to handle 'year' and 'month-year' appearances
    // and to provide the reset button.
    return true;
  }

  _init() {
    this.settings = this.props.appearances.includes("year")
      ? {
          format: "yyyy",
          type: "number",
          placeholder: "yyyy",
        }
      : this.props.appearances.includes("month-year")
        ? {
            format: "yyyy-mm",
            type: "month",
            placeholder: "yyyy-mm",
          }
        : {
            format: "yyyy-mm-dd",
            type: "date",
            placeholder: "yyyy-mm-dd",
          };

    this.$fakeDateI = this._createFakeDateInput(this.settings);

    this._setChangeHandler(this.$fakeDateI);
    this._setFocusHandler(this.$fakeDateI);
    this._setResetHandler(this.$fakeDateI);

    this.enable();
    this.value = this.element.value;

    if (this.props.readonly) {
      this.disable();
    }
  }

  /**
   * Creates fake date input elements
   *
   * @param {object} settings - The widget settings
   * @return {jQuery} The jQuery-wrapped fake date input element
   */
  _createFakeDateInput(settings) {
    const $dateI = $(this.element);
    const $fakeDate = $(
      `<div class="widget date"><input class="ignore input-small" type="${settings.type}" placeholder="${settings.placeholder}" /></div>`,
    ).append(this.resetButtonHtml);
    const $fakeDateI = $fakeDate.find("input");

    if (settings.type === "number") {
      $fakeDateI.attr("min", "1900");
      $fakeDateI.attr("max", "2100");
    }

    $dateI.hide().before($fakeDate);

    return $fakeDateI;
  }

  /**
   * Copy manual changes to original date input field
   *
   * @param {jQuery} $fakeDateI - Fake date input element
   */
  _setChangeHandler($fakeDateI) {
    const { settings } = this;

    $fakeDateI.on("change paste", (e) => {
      let convertedValue = "";
      let value =
        e.type === "paste"
          ? getPasteData(e.originalEvent ?? e)
          : $fakeDateI.val();

      if (value.length > 0) {
        if (isNumber(value) && settings.format !== "yyyy") {
          convertedValue = "";
        } else {
          value = this._toActualDate(value);
          convertedValue = types.date.convert(value);
        }
      }

      $fakeDateI.val(this._toDisplayDate(convertedValue));

      if (this.originalInputValue !== convertedValue) {
        this.originalInputValue = convertedValue;
      }

      return false;
    });
  }

  /**
   * Reset button handler
   *
   * @param {jQuery} $fakeDateI - Fake date input element
   */
  _setResetHandler($fakeDateI) {
    $fakeDateI.next(".btn-reset").on("click", () => {
      if (this.originalInputValue) {
        this.value = "";
      }
    });
  }

  /**
   * Handler for focus events.
   *
   * @param {jQuery} $fakeDateI - Fake date input element
   */
  _setFocusHandler($fakeDateI) {
    $(this.element).on("applyfocus", () => {
      $fakeDateI[0].focus();
    });
  }

  /**
   * @param {string} [date] - date
   * @return {string} the actual date
   */
  _toActualDate(date = "") {
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
  _toDisplayDate(date = "") {
    date = date.trim();

    return date && this.settings.format === "yyyy"
      ? date.substring(0, 4)
      : this.settings.format === "yyyy-mm"
        ? date.substring(0, 7)
        : date;
  }

  disable() {
    this.$fakeDateI.prop("disabled", true);
    this.$fakeDateI.next(".btn-reset").prop("disabled", true);
  }

  enable() {
    this.$fakeDateI.prop("disabled", false);
    this.$fakeDateI.next(".btn-reset").prop("disabled", false);
  }

  update() {
    this.value = this.element.value;
  }

  /**
   * @type {string}
   */
  get displayedValue() {
    return this.question.querySelector(".widget input").value;
  }

  /**
   * @type {string}
   */
  get value() {
    return this._toActualDate(this.displayedValue);
  }

  set value(date) {
    this.$fakeDateI.val(this._toDisplayDate(date));
  }
}

export default DatepickerExtended;
