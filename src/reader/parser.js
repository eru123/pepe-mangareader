import axios from "axios";

function stripCases(html) {
  function stripXMLCases(html) {
    const regex = /(<\?([^?>]+)\?>)/;
    let m = regex.exec(html);

    if (m) {
      return html.replace(m[0], "");
    }
    return html;
  }
  function stripDocType(html) {
    const regex = /(<!([^>]+)>)/;
    let m = regex.exec(html);
    if (m) {
      return html.replace(m[0], "");
    }
    return html;
  }

  html = stripXMLCases(html);
  html = stripDocType(html);

  return html;
}
function strToXml(str) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(str, "text/xml");
  return xmlDoc;
}
function strToHtml(str) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc;
}

function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (typeof xml.attributes == "object" && xml.attributes.length > 0) {
      obj["$attr"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["$attr"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  } else {
    return obj;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (nodeName.charAt(0) == "#") {
        nodeName = "$" + nodeName.substr(1);
      }
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (
          typeof obj[nodeName].push == "undefined" &&
          typeof obj[nodeName] != "undefined"
        ) {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
function nodeToObject(node) {
  var obj = {};
  for (var p in node) {
    obj[p] = node[p];
  }
  return obj;
}
function htmlToJson(html) {
  html = nodeToObject(html);
  var obj = {};
  if (html.nodeType == 9 || html.nodeType == 1) {
    if (typeof html.attributes == "object" && html.attributes.length > 0) {
      obj["$attr"] = {};
      for (var j = 0; j < html.attributes.length; j++) {
        var attribute = html.attributes.item(j);
        obj["$attr"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else {
    return {};
  }
  if (typeof html.childNodes == "object" && html.childNodes.length > 0) {
    for (var i = 0; i < html.childNodes.length; i++) {
      var item = html.childNodes.item(i);
      var nodeName = item.nodeName.toLowerCase();
      if (nodeName.charAt(0) == "#") {
        nodeName = "$" + nodeName.substr(1);
        obj[nodeName] = html.innerText;
      } else {
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = htmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(htmlToJson(item));
        }
      }
    }
  }
  return obj;
}

function toXmlObject(doc) {
  return xmlToJson(doc);
}
function toXmlJson(doc) {
  return JSON.stringify(xmlToJson(doc));
}
function toHtmlObject(doc) {
  return htmlToJson(doc);
}
function toHtmlJson(doc) {
  return JSON.stringify(htmlToJson(doc));
}
async function getFromUrl(url) {
  return await axios.get(url).then(e => {
    let text = stripCases(e.data);
    return {
      text: text,
      toXml: strToXml(text),
      toHtml: strToHtml(text)
    };
  });
}
export default {
  url: getFromUrl,
  toXml: strToXml,
  toHtml: strToHtml,
  toXmlObject: toXmlObject,
  toXmlJson: toXmlJson,
  toHtmlObject: toHtmlObject,
  toHtmlJson: toHtmlJson,
  toObject: nodeToObject
};
