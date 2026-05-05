- [ ] Prod test (angular integration)
- [ ] Consider moving package code to root src folder

- [ ] Consider dropping light dom and exporting scss file for consumer to use (easier to modify)
        Could add example to demo
- [ ] Fix rating widget not showing stars
        Could be form compilation error, or style error
- [ ] Fix ranking widget not working
- [ ] Replace digest with lightweight alt (if likely to need... or document)

- [ ] Improve styling, organise variables to better mimic https://ee.kobotoolbox.org/x/8JGrcU96
        Consider removing other themes, create custom with more variables exposed

- [ ] Add docs for use in angular standalone (register schema and import webcomponetn)

```ts
import '@picsa/enketo-webform';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

```

- [ ] Consider font managmenet (e.g. exposing way to set)
- [ ] Consider removing leaflet or other external deps (?)
- [ ] Document geopicker widget removed and node-forge/digest


## Documentation Notes

### Source Repo Compatibility
- bootstrap-datepicker has been removed
- date widgets unified (previous separate date, datetime, ios, extended etc.). Most custom styles dropped for timepicker etc.