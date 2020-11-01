import parser from "./parser";

const host_list = [
  "https://www.mangareader.net/",
  "https://cors-anywhere.herokuapp.com/https://www.mangareader.net/"
];
export default useCors => {
  var host = host_list[0];
  if (useCors) {
    host = host_list[1];
  }
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  async function home() {
    var wp = parser;
    return await wp.url(host).then(e => {
      var doc = e.toHtml;
      var result = {};

      var latest = [];
      var updates = [];
      var popular = [];

      forEachValue(doc.querySelectorAll(".d53"), function(item) {
        item = item.querySelector("a");
        latest.push({
          title: item.innerHTML,
          code: item.getAttribute("href").substr(1)
        });
      });

      forEachValue(doc.querySelectorAll(".d72"), function(item) {
        item = item.querySelector("a");
        popular.push({
          title: item.innerHTML,
          code: item.getAttribute("href").substr(1)
        });
      });
      forEachValue(doc.querySelectorAll(".d41"), function(item) {
        updates.push({
          code: item.getAttribute("href").substr(1),
          title: item.querySelector("img").getAttribute("alt"),
          img: "https://" + item.querySelector("img").getAttribute("src")
        });
      });

      result.latest = latest;
      result.updates = updates;
      result.popular = popular;

      return result;
    });
  }
  async function search(query) {
    var wp = parser;
    return await wp
      .url(host + "search/?nsearch=" + query)
      .then(e => {
        var final = [];
        var result = e.toHtml.querySelectorAll(".d54");
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            var item = {};
            item.cover =
              result[i].querySelector(".d56").getAttribute("data-src") || false;
            item.title =
              result[i].querySelector(".d57").querySelector("a").innerHTML ||
              false;
            item.link =
              result[i]
                .querySelector(".d57")
                .querySelector("a")
                .getAttribute("href") || false;
            item.description =
              result[i].querySelector(".d58").innerHTML || false;
            item.genre = result[i].querySelector(".d60").innerHTML || false;

            if (item.cover != false && item.cover.substr(0, 2) == "//") {
              item.cover = "https://" + item.cover.substr(2);
            }

            if (item.link != false && item.link.substr(0, 1) == "/") {
              item.link = item.link.substr(1);
            }

            final.push(item);
          }
        }
        return final;
      })
      .catch(() => {
        return [];
      });
  }
  async function manga(code) {
    var wp = parser;
    return await wp
      .url(host + code)
      .then(e => {
        var final = {};

        final.chapters = [];

        var result = e.toHtml;
        final.cover = result
          .querySelector(".d38")
          .querySelector("img")
          .getAttribute("src");
        final.title = result.querySelector(".d40").innerHTML;
        final.description = result
          .querySelector(".d46")
          .querySelector("p").innerHTML;
        var infos = result.querySelector(".d41").querySelectorAll("tr");
        var chapContainer = result.querySelector(".d48").querySelectorAll("tr");
        if (final.cover.substr(0, 2) == "//") {
          final.cover = "https:" + final.cover;
        }

        forEachValue(infos, function(v) {
          var tr = v.querySelectorAll("td");
          var iname = tr[0].innerHTML.replace(" :", "");
          iname = iname.replaceAll(" ", "_").toLowerCase();

          var childs = wp.toObject(tr[1].childNodes);
          var childsContent = "";
          childs.forEach(function(e) {
            var data = wp.toObject(e).data || "";
            var text = wp.toObject(e).innerHTML || "";

            if (data != false) {
              childsContent = childsContent + ", " + data;
            }
            childsContent = childsContent + ", " + text;
          });

          if (childsContent.length > 2) {
            if (childsContent.substr(-2) == ", ") {
              final[iname] = childsContent.substr(2, childsContent.length - 4);
            } else {
              final[iname] = childsContent.substr(2);
            }
          }
        });

        forEachValue(chapContainer, function(v) {
          if (wp.toObject(v).classList.length == 0) {
            var chap = {};

            var td1 = wp.toObject(v).childNodes[0].querySelector("a");
            var td2 = wp.toObject(v).childNodes[1];

            chap.published = td2.innerHTML;
            chap.title = td1.innerHTML;
            chap.code = td1.getAttribute("href").substr(1);
            final.chapters.push(chap);
          }
        });
        return final;
      })
      .catch(() => {
        return {};
      });
  }
  async function chapter(code) {
    var wp = parser;
    return await wp
      .url(host + code)
      .then(e => {
        var result = [];
        var rawImages =
          JSON.parse(
            e.toHtml
              .querySelector("#main")
              .querySelector("script")
              .innerHTML.replace('document["mj"]=', "")
          ).im || {};

        forEachValue(rawImages, function(v) {
          var tmp = v;
          tmp.u = "https:" + tmp.u;
          result.push(tmp);
        });
        return result;
      })
      .catch(() => {
        return {};
      });
  }
  return {
    home: home,
    search: search,
    manga: manga,
    chapter: chapter
  };
};
