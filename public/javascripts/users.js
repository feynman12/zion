// Wrap in an immediately invoked function expression.

function locationParser(loc) {
    result = null;
    if (loc) {
        temp = loc.split(",");
        result = {
            'city': temp[0],
            'state': temp[1].slice(1)
        }
    }
    return result;
}

(function() {
    $(document).on('submit', '#signin-form', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/login',
            helpers.getFormData(this)
        ).done(function(response) {
            currentUser = response.content.user;
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('submit', '#register-form', function(evt) {
        evt.preventDefault();
        var values = helpers.getFormData(this);
        if (values.password !== values.confirm) {
            $('.error').text('Password and confirmation do not match!');
            return;
        }

        birthdayParts = values["birthday"].split("/")
        var record = {
            'username': values['username'],
            'password': values['password'],
            'profile': {
                'name': {
                    'first': values['first-name'],
                    'middle': values['middle-name'],
                    'last': values['last-name']
                },
                'email': values['email'],
                'sex': values['sex'],
                'birthday': new Date(birthdayParts[2], birthdayParts[0]-1, birthdayParts[1]),
                'education': {
                    'school': values['school'],
                    'degree': values['degree'],
                    'major': values['major']
                },
                'residence': locationParser(values["residence"]),
                'hometown': locationParser(values["hometown"]),
                'work': {
                    'employer': values['work-employer'],
                    'position': values['work-position'],
                    'location': locationParser(values["work-location"])
                },
                'interestedIn': values['interested'],
                'relationshipStatus': {
                    'status': values["relationship-status"]
                }
            }
        }

        $.post(
            '/users',
            record
        ).done(function(response) {
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
            $('.error').text(response.err);
        });
    });

    $(document).on('click', '#logout-link', function(evt) {
        evt.preventDefault();
        $.post(
            '/users/logout'
        ).done(function(response) {
            currentUser = undefined;
            loadHomePage();
        }).fail(function(responseObject) {
            var response = $.parseJSON(responseObject.responseText);
       
        });
    });
})();
