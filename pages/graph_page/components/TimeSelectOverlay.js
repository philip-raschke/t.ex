var TimeSelectOverlay = {
  timeLimitationSelectElement: null,
  timeLimitationSelect: null,

  load: function() {
    TimeSelectOverlay.timeLimitationSelectElement = document.getElementById("time-limitation-select");
    TimeSelectOverlay.timeLimitationSelect = new M.FormSelect(TimeSelectOverlay.timeLimitationSelectElement, {});
    TimeSelectOverlay.timeLimitationSelectElement.addEventListener("change", TimeSelectOverlay.changeHandler);
  },

  changeHandler: function() {
    chrome.storage.local.get("privateKey", function(result) {
      if (result.hasOwnProperty("privateKey")) {
        Bootstrap.decryptPrivateKey(result.privateKey, function(privateKey) {
          var hours = TimeSelectOverlay.timeLimitationSelectElement.options[TimeSelectOverlay.timeLimitationSelectElement.selectedIndex].value;
          var limit = TimeSelectOverlay.timeLimitationSelectElement.options[TimeSelectOverlay.timeLimitationSelectElement.selectedIndex].value * 60 * 60 * 1000;
          document.getElementById("time-loading-indicator").style.visibility = "visible";

          GraphPage.resetGraph();
          GraphPage.renderGraph(limit, privateKey, function() {
            InfoOverlay.load();
            AggregatedDataModal.load();
          });
        });
      }
    });
  },

}