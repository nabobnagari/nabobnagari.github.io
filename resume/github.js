// Generated by CoffeeScript 1.10.0
(function() {
  var fillskills, get, getRec, getWorkex, header, hide, icon, item, j, l, len, len1, menuitems, setTabs, setWidth, show, tabs,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  show = function(els) {
    var e, j, len, results;
    if (els.length) {
      results = [];
      for (j = 0, len = els.length; j < len; j++) {
        e = els[j];
        results.push(e.style.display = 'block');
      }
      return results;
    } else {
      return els.style.display = 'block';
    }
  };

  hide = function(els) {
    var e, j, len, results;
    if (els.length) {
      results = [];
      for (j = 0, len = els.length; j < len; j++) {
        e = els[j];
        results.push(e.style.display = 'none');
      }
      return results;
    } else {
      return els.style.display = 'none';
    }
  };

  get = function(x, parent) {
    var y;
    if (parent == null) {
      parent = document;
    }
    y = x.substr(1);
    switch (x[0]) {
      case '.':
        return parent.getElementsByClassName(y);
      case '#':
        return parent.getElementById(y);
      default:
        return parent.getElementsByTagName(x);
    }
  };

  setTabs = function() {
    var hash, i, j, len, menuitems, tabs;
    tabs = get('.tabs')[0];
    menuitems = get('li', tabs);
    hash = location.hash.substr(1) || menuitems[0].getAttribute('href');
    for (j = 0, len = menuitems.length; j < len; j++) {
      i = menuitems[j];
      i.classList.remove('active');
      if (i.getAttribute('href') === hash) {
        i.classList.add('active');
      }
    }
    hide(get('.tab-items'));
    show(get('#' + hash));
    return true;
  };

  tabs = get('.tabs')[0];

  menuitems = get('li', tabs);

  for (j = 0, len = menuitems.length; j < len; j++) {
    item = menuitems[j];
    item.addEventListener('click', function() {
      location.hash = this.getAttribute('href');
      ga('send', 'event', GA, 'tabs', this.getAttribute('href'));
      return setTabs();
    });
  }

  fillskills = function() {
    var SKILLS, l, len1, li, results, skill, span, ul;
    SKILLS = [
      {
        skill: 'WebSphere',
        value: 9,
        stack: 'Middleware'
      }, {
        skill: 'Apache',
        value: 9,
        stack: 'Middleware'
      }, {
        skill: 'AWS',
        value: 6,
        stack: 'Cloud'
      }, {
        skill: 'Jboss',
        value: 8,
        stack: 'Middleware'
      }, {
        skill: 'Devops',
        value: 8,
        stack: 'Agile'
      }, {
        skill: 'Docker',
        value: 7,
        stack: 'frontend'
      }, {
        skill: 'Jenkins',
        value: 6,
        stack: 'frontend'
      }, {
        skill: 'Db2',
        value: 5,
        stack: 'frontend'
      }, {
        skill: 'Kubernetes',
        value: 3,
        stack: 'frontend'
      }, {
        skill: 'HTML',
        value: 6,
        stack: 'frontend'
      }, {
        skill: 'Django',
        value: 3,
        stack: 'backend'
      }, {
        skill: 'Python',
        value: 6,
        stack: 'backend'
      }, {
        skill: 'Aix',
        value: 7,
        stack: 'backend'
      }, {
        skill: 'Java',
        value: 4,
        stack: 'backend'
      }, {
        skill: 'GIT',
        value: 6,
        stack: 'others'
      }, {
        skill: 'nginx',
        value: 3,
        stack: 'others'
      }, {
        skill: 'Linux',
        value: 9,
        stack: 'others'
      }
    ];
    ul = get('#skillSet');
    results = [];
    for (l = 0, len1 = SKILLS.length; l < len1; l++) {
      skill = SKILLS[l];
      li = document.createElement("li");
      li.setAttribute("data-content", skill.skill);
      span = document.createElement("span");
      span.classList.add("graph");
      span.classList.add(skill.stack);
      li.appendChild(span);
      setWidth(span, skill.value * 10);
      results.push(ul.appendChild(li));
    }
    return results;
  };

  setWidth = function(el, width) {
    setTimeout(function() {
      return el.style.width = width + '%';
    }, 1000);
    return width;
  };

  getRec = function() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var data, l, len1, li, name, recs, ref, results, src, tar;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        data = JSON.parse(xhttp.responseText);
        src = get('#recTemplate');
        tar = get('#recontent');
        ref = data.recommendationsReceived.values;
        results = [];
        for (l = 0, len1 = ref.length; l < len1; l++) {
          recs = ref[l];
          li = src.children[0].cloneNode(true);
          name = get('.name', li)[0];
          name.innerHTML = recs.recommender.firstName + recs.recommender.lastName;
          if (recs.recommender.publicProfileUrl) {
            name.setAttribute("href", recs.recommender.publicProfileUrl);
          } else {
            name.classList.remove('blue');
            name.removeAttribute("href");
          }
          if (recs.recommender.headline) {
            get('.title', li)[0].innerHTML = recs.recommender.headline;
          }
          get('.content', li)[0].innerHTML = recs.recommendationText;
          if (recs.recommender.pictureUrl) {
            get('.pic', li)[0].src = recs.recommender.pictureUrl;
          } else {
            get('.pic', li)[0].remove();
          }
          results.push(tar.appendChild(li));
        }
        return results;
      }
    };
    xhttp.open("GET", "rec.json", true);
    xhttp.send();
    return true;
  };

  getWorkex = function() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var commit, data, i, k, l, len1, len2, len3, li, m, more, n, p, pro, projects, ref, ref1, results, span, st, stacks, text, title, ul;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        data = JSON.parse(xhttp.responseText);
        ul = get('.projects')[0];
        results = [];
        for (l = 0, len1 = data.length; l < len1; l++) {
          i = data[l];
          li = document.createElement("li");
          commit = document.createElement("span");
          commit.setAttribute("class", "commits sub-brown");
          commit.innerHTML = i.company;
          li.appendChild(commit);
          ref = i.projects;
          for (m = 0, len2 = ref.length; m < len2; m++) {
            projects = ref[m];
            pro = document.createElement("div");
            pro.setAttribute("class", "project-details");
            li.appendChild(pro);
            title = document.createElement("div");
            title.classList.add('title');
            title.innerHTML = projects.name;
            if (projects.description) {
              more = document.createElement("div");
              more.classList.add("more");
              more.addEventListener('click', function() {
                var p;
                p = this.parentNode.nextElementSibling.nextElementSibling;
                var project_name = this.parentNode.textContent
                p.style.display = p.style.display === 'block' ? 'none' : 'block';
                if (p.style.display === 'block') {
                  ga('send', 'event', GA, 'workex', project_name);
                }
                return true;
              });
              title.appendChild(more);
            }
            pro.appendChild(title);
            stacks = document.createElement("div");
            stacks.setAttribute("class", "subtitle sub-brown-dark");
            ref1 = projects.skills;
            for (n = 0, len3 = ref1.length; n < len3; n++) {
              st = ref1[n];
              span = document.createElement("span");
              span.classList.add("stack-tags");
              text = st;
              if (indexOf.call(st, ":") >= 0) {
                k = st.split(":");
                span.classList.add(k[0]);
                text = k[1];
              }
              span.innerHTML = text;
              stacks.appendChild(span);
            }
            pro.appendChild(stacks);
            if (projects.description) {
              p = document.createElement("p");
              p.setAttribute("class", "description");
              p.innerHTML = projects.description;
              pro.appendChild(p);
            }
          }
          results.push(ul.appendChild(li));
        }
        return results;
      }
    };
    xhttp.open("GET", "workex.json", true);
    xhttp.send();
    return true;
  };

  setTabs();

  fillskills();

  getWorkex();

  getRec();

  header = get('.icon', get('section')[0]);

  for (l = 0, len1 = header.length; l < len1; l++) {
    icon = header[l];
    icon.onclick = function() {
      var className, e, error;
      try {
        className = this.className.match(/\w*-icon/)[0].slice(0, -5);
      } catch (error) {
        e = error;
        className = this.className;
      }
      return ga('send', 'event', GA, 'header', className);
    };
  }

}).call(this);
