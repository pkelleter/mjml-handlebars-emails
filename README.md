# Preview

![Preview not found](https://github.com/pkelleter/mjml-handlebars-emails/blob/master/example.jpg?raw=true)

# Development
run `npm run serve-dev` to serve live-edit client on port 5200 and emails api on port 5201.
Now you can edit the email templates in the `./apps/email-templating-api/src/assets/templates/` directory and see immediate impact in your client.

# Structure

Every file named `index.hbs` will result in a *new Email Id*. The Id-name itself will be extrapolated from the direct parent directory name.
So a file `./foo/bar/index.hbs` will result in an Email id of *bar*. <br>
It is also expected that there is an `examples.json` file in the same directory containing the corresponding examples for the given template.
Also please make sure that the `examples.json` has the proper structure (Array of the Interface TemplateExamples).

Every file *ending with .hbs* but other than `index.hbs` will be considered a partial and can be injected into your
main templates accordingly. The partial key is derived by the directory structure by *replacing* the system-dependant path-seperator with `~` and *removing* the `.hbs`.
So a file `./foo/bar/baz.hbs` will result in a *partial Id* of `foo~bar~baz`.

*Please note that the nrwl watch process seems to have some hick-up when we add new files to the assets (templates) directory while the process is running.
We will need to restart the process after doing that until we find a workaround or they fix it on their own.*

# Production
run `npm run build` to trigger the production build for the API. The client isn't meant to be built for production, it is only a tool for local development.
