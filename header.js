fetch("./header.html")
  .then(r => {
    if (!r.ok) throw new Error("header.html not found");
    return r.text();
  })
  .then(html => {
    document.getElementById("header-placeholder").innerHTML = html;
  })
  .catch(err => console.error(err));