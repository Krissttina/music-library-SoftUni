import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import { editAlbumById, getAlbumById } from "../data/auth.js";

const editTemplate = (album, onEdit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${onEdit} class="edit-form">
        <input type="text" name="singer" id="album-singer"
        .value="${album.singer}" placeholder="Singer/Band" /> <input type="text"
        name="album" id="album-album" .value="${album.album}" placeholder="Album"
        /> <input type="text" name="imageUrl" id="album-img"
        .value="${album.imageUrl}" placeholder="Image url" /> <input type="text"
        name="release" id="album-release" .value="${album.release}"
        placeholder="Release date" /> <input type="text" name="label"
        id="album-label" .value="${album.label}" placeholder="Label" /> <input
        type="text" name="sales" id="album-sales" .value="${album.sales}" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const albumId = ctx.params.id;

  const album = await getAlbumById(albumId);
  ctx.render(editTemplate(album, createSubmitHandler(onEdit)));

  async function onEdit(data){
    if(Object.values(data).some(x => x === '')){
        return alert('All fields are required!')
    }
    await editAlbumById(albumId, data);
    ctx.page.redirect("/details/" + albumId);
  }
}