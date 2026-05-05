import {
  getTimezoneOffsetAsTime,
  toISOLocalString,
} from "../../../openrosa/date-extensions";
import $ from "jquery";
import Widget from "../../js/widget";
import { os, browser } from "../../js/sniffer";
import events from "../../js/event";
import "../../js/extend";

/**
 * @augments Widget
 */
class DatetimepickerExtended extends Widget {
  $fakeDateTimeI!: JQuery<HTMLInputElement>;

  /**
   * @type {string}
   */
  static get selector() {
    return '.question input[type="datetime-local"]:not([readonly])';
  }

  /**
   * @return {boolean}
   */
  static condition() {
    // Always instantiate to handle timezone mapping and native input wrapper.
    return true;
  }

  _init() {
    this.$fakeDateTimeI = this._createFakeDateTimeInput();

    this.element.classList.add("hide");
    this.element.before(
      document
        .createRange()
        .createContextualFragment('<div class="datetimepicker widget" />'),
    );
    const widget = this.question.querySelector(".widget");
    if (widget) {
      widget.append(this.$fakeDateTimeI[0].closest(".datetime") as Node);
    }

    this.value = this.originalInputValue;

    this._setFocusHandler(this.$fakeDateTimeI);

    this.$fakeDateTimeI.on("change", () => {
      this.originalInputValue = this.value;
      return false;
    });

    // reset button
    const resetBtn = this.question.querySelector(".btn-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (this.originalInputValue) {
          this.originalInputValue = "";
          this.value = "";
        }
      });
    }
  }

  /**
   * @return {JQuery<HTMLInputElement>} fake datetime input
   */
  _createFakeDateTimeInput(): JQuery<HTMLInputElement> {
    const $fakeDateTime = $(
      '<div class="datetime">' +
        '<input class="ignore" type="datetime-local"/>' +
        "</div>",
    ).append(this.resetButtonHtml as any);

    const $input = $fakeDateTime.find("input") as JQuery<HTMLInputElement>;

    // Open date picker when clicking anywhere in the input
    $input.on("click", function () {
      try {
        if (typeof this.showPicker === "function") {
          this.showPicker();
        }
      } catch (e) {
        // Ignore if browser throws error
      }
    });

    return $input;
  }

  /**
   * @param {JQuery<HTMLInputElement>} $els - a set of elements wrapped in jQuery
   */
  _setFocusHandler($els: JQuery<HTMLInputElement>) {
    // Handle focus on original input (goTo functionality)
    this.element.addEventListener((events.ApplyFocus() as Event).type, () => {
      $els.eq(0).focus();
    });
  }

  update() {
    const $dateTimeI = $(this.element);
    let val =
      ($dateTimeI.val() as string).length > 0
        ? toISOLocalString(new Date($dateTimeI.val() as string))
        : "";

    if (os.macos && browser.safari) {
      val =
        ($dateTimeI.val() as string).length > 0
          ? toISOLocalString(
              new Date(
                ($dateTimeI.val() as string) +
                  getTimezoneOffsetAsTime(new Date()),
              ),
            )
          : "";
    }

    if (val !== this.value) {
      // HTML5 datetime-local expects yyyy-MM-ddThh:mm
      this.$fakeDateTimeI.val(val.substring(0, 16));
    }
  }

  get originalInputValue() {
    const originalInputValue = super.originalInputValue;

    if (!originalInputValue) {
      return "";
    }

    return toISOLocalString(new Date(originalInputValue));
  }

  set originalInputValue(value: any) {
    super.originalInputValue = value;
  }

  /**
   * @type {string}
   */
  get value() {
    if ((this.$fakeDateTimeI.val() as string).length > 0) {
      return toISOLocalString(new Date(this.$fakeDateTimeI.val() as string));
    }

    return "";
  }

  set value(value: any) {
    const val = value ? toISOLocalString(new Date(value)) : "";

    if (val) {
      this.$fakeDateTimeI.val(val.substring(0, 16));
    } else {
      this.$fakeDateTimeI.val("");
    }
  }
}

export default DatetimepickerExtended;
