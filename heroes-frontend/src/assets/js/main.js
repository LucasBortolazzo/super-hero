function HideMenuJavaScript() {
    if ($(".navbar-toggler").is(":visible") == true) {
        $('.navbar-toggler').click();
    }
}

function nameIsValid() {
    return (document.getElementById('name').value);
}

function descriptionIsValid() {
    return (document.getElementById('description').value);
}

function FieldsRequiredIsValid() {
    var nameHeroIsValid = nameIsValid();
    var descriptionHeroIsValid = descriptionIsValid();

    if (!nameHeroIsValid) {
        alert('Invalid name Hero. This field is required.');
        document.getElementById('name').focus();
        return false;
    }
    else if (!descriptionHeroIsValid) {
        alert('Invalid description Hero. This field is required.');
        document.getElementById('description').focus();
        return false;
    }

    return true;
}

function hackdivimage() {
    alert('passando');
    var dateDiv = document.getElementById('dateTime');
    if (!dateDiv) {
        dateDiv = document.createElement('div');
        dateDiv.id = 'dateTime';
        document.body.appendChild(dateDiv);
    }
    alert('passou');
}