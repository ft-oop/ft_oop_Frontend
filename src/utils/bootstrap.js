export const bootstrapInput = (text, placeholder, id) => {
  return `
      <div class="input-group">
        <span class="input-group-text">${text}</span>
        <input type="text" class="form-control" id="${id}" placeholder="${placeholder}" aria-label="NickName" aria-describedby="input_nickname">
      </div>
    `;
};
