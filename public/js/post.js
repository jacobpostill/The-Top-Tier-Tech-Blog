const postFormHandler = async (event) => {
  event.preventDefault();
  const postSubject = document.getElementById('post-subject').value.trim();
  const postDetail = document.getElementById('post-detail').value.trim();
  const postImgurl = document.getElementById('post-imgurl').value.trim();
  const postId = document.getElementById('postid').value.trim();

  let fetchUrl = "", postMethod = "";
  if (postSubject && postImgurl && postDetail) {
    if (postId != "")
    {
      fetchUrl = "/api/posts/" + postId;
      postMethod = "PUT";
    }
    else
    {
      fetchUrl = "/api/posts";
      postMethod = "POST";
    }
    const response = await fetch(fetchUrl, {
      method: postMethod,
      body: JSON.stringify({ postSubject, postImgurl, postDetail }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;   
    }
  }
};

const postDelete = async () => {
  const postId = document.querySelector('#postid').value.trim();
  let fetchUrl = "/api/posts/" + postId;
  let postMethod = "DELETE";

  const response = await fetch(fetchUrl, {
    method: postMethod,
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null; 
  }
};

document.getElementById('post-delete').addEventListener('click', postDelete);
document.getElementById('post-submit').addEventListener('click', postFormHandler);