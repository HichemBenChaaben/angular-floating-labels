(function() {
  'use strict';
  angular.module('app.directives.floatinglabels', [])
    .directive('flLabel',
      function() {
        // Runs during compile
        return {
          restrict: 'A',
          transclude: true,
          priority: 1,
          link: function($scope, $element, $attrs) {
            // if the placholder is not specified by the controller scope then it will pickup
            // the one statically existing on the page otheriwse the directive default will be
            // assigned to the placeholder
            var placeholderVal = $attrs.placeholder || $scope.customPlaceholder;
            var requiredClass = 'fl-frm__lbl--required';

            if(!$attrs.required) {
              requiredClass = "";
            }

            console.log($attrs);

            if($attrs.maxLength) {
              console.log('You have max length here ..');
             //bindKeyCount($element);
            }

            $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
              .addClass('fl-frm__el fl-frm__el--txt')
              .after('<span class="fl-frm__lbl-txt">' + placeholderVal +'</span>')
              .after('<span class="fl-frm__lbl-txt--error">Only numbers are allowed</span>');

            if ($attrs.maxLength) {
              $element.after('<span class="js-char-counter"><span class="ccount" data-current-char-count="">' + $element[0].value.length + '</span> / ' + $attrs.maxLength + '</span>');
            }

            function keyBindInput() {
              $element.keyup(function() {
                console.log($attrs.val.length);
              });
            };

            // If we are on the edit mode we should add the label
            if($attrs.value && $attrs.value.length > 0) {
              $element.addClass('js-field-has-value');
            }
            // If we type a key we add the floating label
            $element.bind('keyup blur', function(event) {
              if($attrs.maxLength) {
                var charCount = $element[0].value.length;
                $scope.apply(function(oldValue, newValue) {
                  //$element[0].value.length = charCount;
                  console.log(charCount + ' ' + oldValue + ' ' + newValue);
                });
              }
              // if user types we add or remove a class
              if (event.target.value.length) {
                $element.addClass('js-field-has-value');
              } else {
                $element.removeClass('js-field-has-value');
              }
            });
          }
        };
      }
    )
    // Adding a tooltip directive
    .directive('flTip', function() {
      // it doesn't depend on whatever you are passing to it
      // it will simply work
      return {
        scope: true,
        restrict: 'A',
        priority: 2, // runs at a higher priority otherwise it won't get into the label
        link: function($scope, $element, $attrs) {
        // We are getting the value then assigning it to something and appending it
         $element.after('<span class="fl-frm__tooltip">' + $attrs.flTip + '</span>');
        }
      };
    })
    .directive('flSelect', function() {
      // implemenet later
      return {
        restrict: 'A',
        priority: 1,
        link: function($scope, $element, $attrs) {
          var placeholderVal = $element.find('options')[0] || 'Add a default item';
          var requiredClass = 'fl-frm__lbl--required';

          if(!$attrs.required) {
            requiredClass = "";
          }
          // TODO check the select arrow here
          $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
                .addClass('fl-frm__el fl-frm__el--sel placeholder')
                .after('<span class="fl-frm__lbl-txt">' + placeholderVal +'</span>');
        }
      }
    });

})();
