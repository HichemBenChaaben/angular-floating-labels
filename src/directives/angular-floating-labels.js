(function() {
  'use strict';
  angular.module('app.directives.floatinglabels', [])
    .directive('flLabel',
      function() {
        // Runs during compile
        return {
          restrict: 'EA',
          priority: 1,
          trasclude: true,
          scope: {
            ccount: '&'
          },
          link: function($scope, $element, $attrs) {
            // if the placholder is not specified by the controller scope then it will pickup
            // the one statically existing on the page otheriwse the directive default will be
            // assigned to the placeholder
            var placeholderVal = $attrs.placeholder || $scope.customPlaceholder;
            var requiredClass = 'fl-frm__lbl--required';
            var ccount = 0;

            if(!$attrs.required) {
              requiredClass = "";
            }

            $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
              .addClass('fl-frm__el fl-frm__el--txt')
              .after('<span class="fl-frm__lbl-txt">' + placeholderVal +'</span>')
              .after('<span class="fl-frm__lbl-txt--error">Only numbers are allowed</span>');

            if($attrs.value) {
              // set cccount the length if exist or 0
              var ccount = $attrs.value.length;
            }

            // if Max length is defined then we put a counter to display allowed char numbers
            if($attrs.maxlength) {
              $element.after('<span class="js-char-counter"><span id="ccount">' + ccount + '</span>/' + $attrs.maxlength + '</span>');
            }

            // If we are on the edit mode we should add the label
            if($attrs.value && $attrs.value.length > 0) {
              $element.addClass('js-field-has-value');
            }

            // If we type a key we add the floating label
            $element.bind('keyup keydown blur', function(event) {
              if(event.target.value.length) {
                $element.addClass('js-field-has-value').once;
              } else {
                $element.removeClass('js-field-has-value');
              }
            });

            // if we do have maxlength then we can ccount the elements on type
            $element.bind('keydown', function(event) {
              return($attrs.maxlength ? angular.element(document.getElementById('ccount')).html(event.target.value.length) : false);
            });

          }
        };
      }
    );
    // Adding a tooltip directive
    angular.module('app.directives.floatinglabels')
      .directive('flTip', function() {
      // it doesn't depend on whatever you are passing to it
      // it will simply work
      return {
        restrict: 'EA',
        priority: 2, // runs at a higher priority otherwise it won't get into the label
        link: function($scope, $element, $attrs) {
        // We are getting the value then assigning it to something and appending it
         $element.after('<span class="fl-frm__tooltip">' + $attrs.flTip + '</span>');
        }
      };
    });

    angular.module('app.directives.floatinglabels')
      .directive('flSelect', function() {
        // implemenet later
        return {
          restrict: 'EA',
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
