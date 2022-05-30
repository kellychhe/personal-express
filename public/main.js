const deleteOne = document.querySelectorAll('#deleteBtn')

Array.from(deleteOne).forEach(function(element) {
    element.addEventListener('click', function(){
        const _id = this.parentNode.children[1].children[0].id
        console.log(_id)
        fetch('wordGame', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id': _id
            })
        })
        .then(function (response) {
            window.location.reload()
        })
    })
})

