'use babel';

import mustache from 'mustache';

var template = `
    <div class="test-suite" id="test-id">
      {{#groups}}
        <div class="test-file">
          <div class="file-name">{{label}}</div>
          <div class="test-classes">
              <div class="test-class">
                <div class="test-class-tests">
                  {{#groups}}
                  <div class="test-class-name">{{label}}
                    <span class="arrow"> <i class="fa fa-arrow-right"></i></span>
                  </div>
                  {{#groups}}
                    <div class="test passed" id="test-{{label}}">
                      <span class="imageContainer">
                        <i class="fa fa-check-circle"></i>
                      </span>
                      <span class="test-name">
                        {{label}}
                      </span>
                    </div>
                  {{/groups}}
                  {{/groups}}
                </div>
              </div>
          </div>
        </div>
      {{/groups}}
    </div>
`;

function generate(jsonData){
  return mustache.render(template,jsonData);
}

export default generate;
