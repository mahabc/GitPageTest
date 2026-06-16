fetch("./footer.html")
  .then(r => {
    if (!r.ok) throw new Error("footer.html not found");
    return r.text();
  })
  .then(html => {
    document.getElementById("footer-placeholder").innerHTML = html;
  })
  .catch(err => console.error(err));