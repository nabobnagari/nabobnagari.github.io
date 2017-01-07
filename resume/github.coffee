show = (els)-> 
  if els.length
    e.style.display = 'block' for e in els
  else
    els.style.display = 'block';

hide = (els)-> 
  if els.length
    e.style.display = 'none' for e in els
  else
    els.style.display = 'none';

get =(x,parent = document) ->

  y = x.substr(1)
  switch x[0]
    when '.' then parent.getElementsByClassName(y)
    when '#' then parent.getElementById(y);
    else parent.getElementsByTagName(x)
  
setTabs = ->
  tabs = get('.tabs')[0];
  menuitems = get('li',tabs)

  hash = location.hash.substr(1) or menuitems[0].getAttribute 'href';
  (i.classList.remove('active'); if i.getAttribute('href') is hash then i.classList.add('active')) for i in menuitems
  hide get '.tab-items'
  show get '#'+hash
  true

tabs = get('.tabs')[0];
menuitems = get('li',tabs)
for item in menuitems
  item.addEventListener 'click', ->
    location.hash = this.getAttribute('href')
    ga('send','event',GA,'tabs',this.getAttribute('href'))
    setTabs()

fillskills = ->
  SKILLS = [
    {
      skill:'HTML',
      value:9,
      stack:'frontend'
    },
    {
      skill:'CSS',
      value:9,
      stack:'frontend'
    },
    {
      skill:'Semantic UI',
      value:6,
      stack:'frontend'
    },
    {
      skill:'Javascript',
      value:8,
      stack:'frontend'
    },
    {
      skill:'JQuery',
      value:8,
      stack:'frontend'
    },
    {
      skill:'Angular JS',
      value:5,
      stack:'frontend'
    },
    {
      skill:'Ember JS',
      value:3,
      stack:'frontend'
    },
    {
      skill:'Express/Node',
      value:3,
      stack:'frontend'
    },
    {
      skill:'Knockout JS',
      value:3,
      stack:'frontend'
    },
    {
      skill:'CoffeeScript',
      value:6,
      stack:'frontend'
    },
  {
      skill:'Django',
      value:7,
      stack:'backend'
    },
    {
      skill:'Python',
      value:6,
      stack:'backend'
    },
    {
      skill:' tornado',
      value:4,
      stack:'backend'
    },
    {
      skill:'flask',
      value:4,
      stack:'backend'
    },
    {
      skill:'GIT',
      value:5,
      stack:'others'
    },
    {
      skill:'nginx',
      value:3,
      stack:'others'
    },
    {
      skill:'Linux',
      value:4,
      stack:'others'
    },
  ]
  ul = get('#skillSet')
  for skill in SKILLS
    li = document.createElement "li"
    li.setAttribute "data-content", skill.skill
    span = document.createElement "span"
    span.classList.add "graph"
    span.classList.add skill.stack
    li.appendChild span
    setWidth span, skill.value*10
    ul.appendChild li

setWidth=(el,width) ->
  setTimeout ->
    el.style.width = width + '%'
  ,1000
  width
getRec =->
  xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = ->
    if xhttp.readyState is 4 and xhttp.status is 200
      data = JSON.parse(xhttp.responseText)
      src = get('#recTemplate')
      tar = get('#recontent')

      for recs in data.recommendationsReceived.values
        li = src.children[0].cloneNode(true);
        name = get('.name',li)[0]
        name.innerHTML = recs.recommender.firstName + recs.recommender.lastName 
        if recs.recommender.publicProfileUrl 
          name.setAttribute "href", recs.recommender.publicProfileUrl
        else
          name.classList.remove('blue')
          name.removeAttribute "href"
        if recs.recommender.headline
          get('.title',li)[0].innerHTML = recs.recommender.headline;
        get('.content',li)[0].innerHTML = recs.recommendationText;
        if recs.recommender.pictureUrl
          get('.pic',li)[0].src = recs.recommender.pictureUrl;
        else 
          get('.pic',li)[0].remove()
        tar.appendChild(li);
  xhttp.open "GET", "rec.json", true
  xhttp.send();
  true
getWorkex=->
  xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = ->
    if xhttp.readyState is 4 and xhttp.status is 200
      data = JSON.parse(xhttp.responseText)
      ul = get('.projects')[0];
      for i in data
        li = document.createElement "li"
        commit = document.createElement "span"
        commit.setAttribute "class","commits sub-brown"
        commit.innerHTML = i.company;
        li.appendChild commit

        for projects in i.projects
          pro = document.createElement "div"
          pro.setAttribute "class", "project-details"
          li.appendChild pro
          title = document.createElement "div"
          title.classList.add('title')
          title.innerHTML = projects.name
          if projects.description 
            more = document.createElement "div"
            more.classList.add "more"
            more.addEventListener 'click', ->
              p = this.parentNode.nextElementSibling.nextElementSibling
              p.style.display = if p.style.display is 'block' then 'none' else  'block'
              project_name = this.parentNode.textContent
              if p.style.display is 'block'   
                ga('send','event',GA,'workex', project_name)
              true
            title.appendChild more
          pro.appendChild title

          stacks = document.createElement "div"
          stacks.setAttribute "class", "subtitle sub-brown-dark"
          for st in projects.skills
            span = document.createElement "span"
            span.classList.add "stack-tags"
            text  = st
            if ":" in st
              k= st.split ":"
              span.classList.add k[0]
              text = k[1]
            span.innerHTML = text
            stacks.appendChild span  
          pro.appendChild stacks
          if projects.description
            p = document.createElement "p"
            p.setAttribute "class", "description"
            p.innerHTML = projects.description
            pro.appendChild p
        ul.appendChild li
  xhttp.open "GET", "workex.json", true
  xhttp.send();
  true

setTabs()
fillskills()
getWorkex()
getRec()

header = get('.icon',get('section')[0])
for icon in header
  icon.onclick =->
    try
      className = this.className.match(/\w*-icon/)[0].slice(0,-5)
    catch e
      className = this.className
    ga('send','event',GA,'header', className)