import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from "../util.js";
import { createAlbum } from "../data/auth.js";

// TODO replace with actual view
const createTemplate = (onCreate) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit=${onCreate} class="create-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
        />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
        />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({ singer, album, imageUrl, release, label, sales }) {
    if ([singer, album, imageUrl, release, label, sales].some((x) => x == "")) {
      return alert("All fields are required");
    }

    await createAlbum({
      singer,
      album,
      imageUrl,
      release,
      label,
      sales,
    });

    ctx.page.redirect("/catalog");
  }
}
