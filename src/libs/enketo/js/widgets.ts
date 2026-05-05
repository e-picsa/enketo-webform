/**
 * A collection of all available widgets
 *
 * @module widgets
 */

import NoteWidget from "../widget/note/notewidget";
import SelectDesktop from "../widget/select-desktop/selectpicker";
import SelectMobile from "../widget/select-mobile/selectpicker";
import SelectAutocomplete from "../widget/select-autocomplete/autocomplete";
// HACK - Omit geopicker to avoid leaflet import
// import GeoPicker from '../widget/geo/geopicker';
import TextareaWidget from "../widget/textarea/textarea";
import TableWidget from "../widget/table/tablewidget";
import RadioPicker from "../widget/radio/radiopicker";
import DateWidget from "../widget/date/date";
import SelectMedia from "../widget/select-media/select-media";
import FilePicker from "../widget/file/filepicker";
import DrawWidget from "../widget/draw/draw-widget";
import LikertItem from "../widget/select-likert/likertitem";
import ColumnsWidget from "../widget/columns/columns";
import AnalogScalePicker from "../widget/analog-scale/analog-scalepicker";
import ImageViewer from "../widget/big-image/image-viewer";
import CommentWidget from "../widget/comment/commentwidget";
import ImageMap from "../widget/image-map/image-map";
import RangeWidget from "../widget/range/range-widget";
import RankWidget from "../widget/rank/rank-widget";
import UrlWidget from "../widget/url/url-widget";
import TextMax from "../widget/text-max/text-max";
import RatingWidget from "../widget/rating/rating";
import TextPrint from "../widget/text-print/text-print";
import ThousandsSep from "../widget/thousands-sep/thousands-sep";

export default [
  NoteWidget,
  SelectDesktop,
  SelectMobile,
  SelectAutocomplete,
  // GeoPicker,
  TextareaWidget,
  TableWidget,
  RadioPicker,
  DateWidget, // Handles date, time, and datetime-local natively
  SelectMedia,
  FilePicker,
  DrawWidget,
  LikertItem,
  ColumnsWidget,
  AnalogScalePicker,
  ImageViewer,
  CommentWidget,
  ImageMap,
  RangeWidget,
  RankWidget,
  UrlWidget,
  TextMax,
  RatingWidget,
  TextPrint,
  ThousandsSep,
];
