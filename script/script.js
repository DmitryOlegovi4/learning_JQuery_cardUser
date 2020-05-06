
$('.to-do-form').on('submit', function (event) {
    event.preventDefault();
    let number = $('.number').val();
    if (number < 1 || number > 12){
        alert('Такого сотрудника не существует. Пожалуста, введите значение от 1 до 12!')
    }else {
        getData(number);
    }

});

function getData(number) {
    $.ajax({
        url: "https://reqres.in/api/users/" + `${number}`,
        success: function (data) {
            addUser(data.data);
        }
    })
}

function addUser(User) {
    let container = $('<div>');
    let idUserContainer = $('<div>');
    let emailUserContainer = $('<div>');
    let first_nameUserContainer = $('<div>');
    let last_nameUserContainer = $('<div>');
    let avatarUserContainer = $('<div>');
    let idUser = $('<div>');
    let emailUser = $('<div>');
    let first_nameUser = $('<div>');
    let last_nameUser = $('<div>');
    let avatarUser = $('<img>');
    let closeElem = $('<div>');

    idUser.text('# '+ User.id);
    emailUser.text(User.email);
    first_nameUser.text(User.first_name);
    last_nameUser.text(User.last_name);
    avatarUser.attr('src', User.avatar);
    closeElem.text('x');

    idUserContainer.append(idUser);
    emailUserContainer.append(emailUser);
    first_nameUserContainer.append(first_nameUser);
    last_nameUserContainer.append(last_nameUser);
    avatarUserContainer.append(avatarUser);
    container.append(idUserContainer);
    container.append(emailUserContainer);
    container.append(first_nameUserContainer);
    container.append(last_nameUserContainer);
    container.append(avatarUserContainer);
    container.append(closeElem);

    container.addClass('user');
    closeElem.addClass('close');

    closeElem.on('click', function () {
        $(this).closest('.user').remove();
    });

    $('.users').append(container);

    idUser.on('dblclick', changeVal);
    emailUser.on('dblclick', changeVal);
    first_nameUser.on('dblclick', changeVal);
    last_nameUser.on('dblclick', changeVal);
}

function saveChange() {
    let cur = $(this);
    let curText = cur.val();
    let textElem = $('<div>');
    textElem.text(curText).css('color','red');
    let parent = cur.parent('div');
    parent.prepend(textElem);
    cur.remove();
}

function changeVal(){
    let cur = $(this);
    let curText = cur.text();
    let input = $('<input>');
    input.val(curText);
    let parent = cur.parent('div');
    parent.prepend(input);
    cur.remove();
    input.on('blur', saveChange);
}
