const blogList = document.querySelector("#blogList");
blogList.addEventListener("click", (event) => {
    if(event.target.innerHTML == "Delete") {
        // console.log(event.target.getAttribute('idx'));
        deletePost(event.target.getAttribute('idx'));
    }
    else if(event.target.innerHTML == "Edit") {
        // fill in the older info in the update modal
        // the attribute value binded to the button is String, we need JSON.parse()
        const postData = JSON.parse(event.target.getAttribute('postData'));
        const formEdit = document.querySelector("#formEdit");
        formEdit.idx.value = postData.id;
        formEdit.title.value = postData.title;
        formEdit.detail.value = postData.detail;
    }
});

// add
const formAdd = document.querySelector("#formAdd");
formAdd.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = formAdd.title.value;
    const detail = formAdd.detail.value;
    // TODO: add to DB
    
    // reset form
    formAdd.reset();

    // close modal w/o jQuery
    const modalAdd = document.getElementById('modalAdd');
    const modal = bootstrap.Modal.getInstance(modalAdd);
    modal.hide();

    Swal.fire({
        icon: 'success',
        title: 'Added'
    });

    //redraw
    window.location.reload();
});

// edit
const formEdit = document.querySelector("#formEdit");
formEdit.addEventListener("submit", (e) => {
    e.preventDefault();    
    const idx = formEdit.idx.value;
    const title = formEdit.title.value;
    const detail = formEdit.detail.value;
    data[idx].title = title;
    data[idx].detail = detail;

    // reset form
    formEdit.reset();

    // close modal w/o jQuery
    const modalEdit = document.getElementById('modalEdit');
    const modal = bootstrap.Modal.getInstance(modalEdit);
    modal.hide();

    Swal.fire({
        icon: 'success',
        title: 'Edited'
    });

    //redraw table
    showBlogs();
});

// ======================== Functions ===================
function deletePost(idx) {
    Swal.fire({
        icon: 'warning',
        title: 'Are you sure to delete this post?',
        showCancelButton: true
    })
    .then((result) => {
        if (result.isConfirmed) {
            // TODO: delete in DB
            Swal.fire({
                icon: 'success',
                title: 'Deleted'
            });
            window.location.reload();
        }
    });
}