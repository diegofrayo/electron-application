export default `<section class="project-view">
  <h2 class="page-title"></h2>
  <section>
    <h3>Bookmarks</h3>
    <div class="project-bookmarks"></div>
  </section>
  <hr class="separator" />
  <section>
    <h3>Dropbox File</h3>
    <div class="u-flex">
      <button class="btn-clear-path">x</button>
      <span class="project-file-path u-cut-text"></span>
      <button class="btn-default btn-open-file">Open File</button>
    </div>
  </section>
  <hr class="separator" />
  <section>
    <h3>Create a bookmark</h3>
    <form class="form">
      <div class="input-group">
        <label for="category">Category</label>
        <select name="category" id="category">
          <option value="Code" selected>Code</option>
          <option value="Docs">Docs</option>
          <option value="Project Management">Project Management</option>
          <option value="Websites">Websites</option>
        </select>
      </div>
      <div class="input-group">
        <label for="name">Name</label>
        <input type="name" id="name" />
      </div>
      <div class="input-group">
        <label for="url">Url</label>
        <input type="url" id="url" />
      </div>
      <button type="submit" class="btn-default">Create</button>
    </form>
  </section>
</section>
`
