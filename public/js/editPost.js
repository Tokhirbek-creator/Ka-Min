const editPost = document.querySelector('.editPost');

editPost.addEventListener('click', async (e) => {
  console.log(editPost);
  e.preventDefault();
  if (e.target.id === 'edit') {
    const formData = Object.fromEntries(new FormData(e.target));
    const result = await fetch(`/edit/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (result.ok) {
      window.location = '/';
      // redirect для фронта
    }
  }
});
