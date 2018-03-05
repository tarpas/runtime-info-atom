'use babel';

import fs from 'fs';
import mustache from 'mustache';

var jsonData = fs.readFileSync('../suite_data/carrot_groups.json',{
  "encoding": "UTF8",
});
var data ={
  groups: JSON.parse(jsonData)
}
var template = `
<html>
  <head>
    <title>Test suite view</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <div class="test-suite">
      {{#groups}}
        <div class="test-file">
          <div class="file-name">{{label}}</div>
          <div class="test-classes">
            {{#groups}}
              <div class="test-class">
                <div class="item test-class-name">{{label}}</div>
                <div class="test-class-tests">
                  {{#groups}}
                    <div class="item success">{{label}}</div>
                  {{/groups}}
                </div>
              </div>
            {{/groups}}
          </div>
        </div>
      {{/groups}}
    </div>
  </body>
</html>
`;

var output = mustache.render(template,data);
fs.writeFileSync("./test_suite_view.html", output, {
  "encoding": "UTF8",
});
