PageContent('<div class="cyu-with-context" id="assessment">\
<div id="contentWrapper" class="mcqContentWrapper">\
  <section class="hero-section height-xs-auto cyu_with_context">\
    <div class="containerclass">\
      <!-- Start Screen -->\
      <div class="startscreen" id="start_screen">\
        <div class="start-container">\
          <div class="right_panel bg-darkblue">\
            <div class="screen_containt">\
              <div class="screen_inner_containt">\
                <p class="subhead" aria-label="" tabindex="0"></p>\
                <div class="header-container">\
                  <h2 class="heading" aria-label="" tabindex="0"></h2>\
                </div>\
                <div\
                  class="teraf-body-container"\
                  aria-label=""\
                  tabindex="0"\
                ></div>\
                <div class="button-container">\
                  <button\
                    aria-label=""\
                    tabindex="0"\
                    type="button"\
                    id="start-test"\
                    class="start another start-test-btn"\
                    id="submitLanguage"\
                  >\
                    <span class="startButton_icon">&nbsp;›</span>\
                  </button>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
      <!-- Start Screen End -->\
      <!-- MCQ -->\
      <div\
        class="cyu-container"\
        style="display: none !important"\
        id="mainMCQ"\
      >\
        <div class="cyuScroll">\
          <div class="cyu-title">\
            <div aria-label="" tabindex="0" class="ques-count" role="text">\
              <b>\
                <span>Question</span>\
                <span class="curr-ques"></span>\
              </b>\
            </div>\
            <h1 aria-label="" tabindex="0" id="qText"></h1>\
            <p aria-label="" tabindex="0" id="instruction_text"></p>\
          </div>\
          <div id="cyu_block" class="cyuBlock_class"></div>\
        </div>\
      </div>\
      <!-- MCQ ENDS -->\
      <!-- score screen starts -->\
      <div class="score-screen score-screen-pass" style="display: none">\
        <div class="body-container">\
          <div class="text-container">\
            <div class="heading"><h4 tabindex="0" role="heading"></h4></div>\
            <div class="paragraph" tabindex="0"></div>\
          </div>\
          <div class="result-backgorund">\
            <div class="rectangles">\
              <div class="right_rectangle">\
                <div class="card">\
                  <div class="percent">\
                    <svg>\
                      <circle cx="70" cy="70" r="70"></circle>\
                      <circle cx="70" cy="70" r="70"></circle>\
                    </svg>\
                    <div class="number">\
                      <span class="inCircle">\
                        <p id="percentage"></p>\
                        <p id="totalQuestion">5/10</p>\
                      </span>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="bottom-container">\
              <div\
                class="bottom-text-first bottomtxt"\
                tabindex="0"\
                role="text"\
              ></div>\
              <span class="seaparator"></span>\
              <div\
                class="bottom-text-second bottomtxt"\
                tabindex="0"\
                role="text"\
              ></div>\
              <button class="retake-assesment" id="certificate" tabindex="0">\
                Retake Assessment\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class="score-screen score-screen-fail" style="display: none">\
        <div class="body-container">\
          <div class="text-container">\
            <div class="heading"><h4 aria-label="" tabindex="0"></h4></div>\
            <div class="paragraph" tabindex="0"></div>\
          </div>\
          <div class="result-backgorund">\
            <div class="rectangles">\
              <!-- <div class="left-rectagle">\
              <div class="topic">\
              <span class="topic-text">Topic1</span\
              ><span class="bar-container">\
                <div class="progress">\
                <div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15"aria-valuemin="0" aria-valuemax="100">50%</div>\
                </div> </span><span class="fraction">2/4</span>\
              </div>\
            </div> -->\
              <div class="right_rectangle">\
                <div class="card">\
                  <div class="percent">\
                    <svg>\
                      <circle cx="70" cy="70" r="70"></circle>\
                      <circle cx="70" cy="70" r="70"></circle>\
                    </svg>\
                    <div class="number">\
                      <span class="inCircle">\
                        <p id="percentage"></p>\
                        <p id="totalQuestion">5/10</p>\
                      </span>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="bottom-container">\
              <div\
                class="bottom-text-first bottomtxt"\
                tabindex="0"\
                role="text"\
              ></div>\
              <span class="seaparator"></span>\
              <div\
                class="bottom-text-second bottomtxt"\
                tabindex="0"\
                role="text"\
              ></div>\
              <button class="retake-assesment" id="retry" tabindex="0">\
                Retake Assessment\
              </button>\
            </div>\
          </div>\
        </div>\
      </div>\
      <!-- score screen ends -->\
      <!--Certificate Screen Start--->\
      <div\
        class="score-screen-certificate"\
        id="certificate-screen"\
        style="display: none"\
      >\
        <div id="container" class="container">\
          <div class="inner-container">\
            <img class="logo" src="" alt="" />\
            <h1 class="heading" aria-label="" tabindex="0"></h1>\
            <h2 class="pera" aria-label="" tabindex="0"></h2>\
            <p class="pera" aria-label="" tabindex="0"></p>\
            <h2 class="name" aria-label="" tabindex="0">Nabirajan, Yuvraj</h2>\
            <h1 class="roll-no" aria-label="" tabindex="0">153489</h1>\
            <p class="pera" aria-label="" tabindex="0"></p>\
            <h2 class="pera" aria-label="" tabindex="0"></h2>\
            <p aria-label="" tabindex="0">\
              on <b>Date</b> <span class="current_date"></span>\
            </p>\
            <button\
              aria-label=""\
              tabindex="0"\
              class="view-certificate"\
              id="printBtn"\
            >\
              <b>View Certificate</b>\
            </button>\
          </div>\
        </div>\
      </div>\
      <!--Certificate Screen Start--->\
\
      <div class="accessiblity-screen-container" id="accessiblity_container">\
        <div class="accessiblityTopheader">\
          <a\
            href="#"\
            class="normal"\
            tabindex="0"\
            role="button"\
            aria-label="Select to make font size 100%"\
            >A</a\
          >\
          <a\
            href="#"\
            class="medium"\
            tabindex="0"\
            role="button"\
            aria-label="Select to make font size 150%"\
            >A</a\
          >\
          <a\
            href="#"\
            class="large"\
            tabindex="0"\
            role="button"\
            aria-label="Select to make font size 200%"\
          >\
            A</a\
          >\
        </div>\
        <div class="scroll_effect">\
          <div class="topicsdiv"></div>\
          <button tabindex="0" class="takeAssessmentBtn" role="button">\
            Take Assessment\
          </button>\
        </div>\
      </div>\
    </div>\
  </section>\
</div>\
</div>\
')
