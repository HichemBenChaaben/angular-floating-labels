(function() {
'use strict';
angular.module('app.directives.floatinglabels', [])
    .directive('flLabel', function($compile) {
            return {
                restrict: 'A',
                priority: 1,
                controller: 'updateMaxCount',
                scope: {
                    count: "=count",
                    chars: '@chars',
                },
                link: function($scope, $element, $attrs) {
                    var placeholderVal = $attrs.placeholder;
                    var requiredClass = 'fl-frm__lbl--required';
                    var count = 0,
                        something = 0,
                        tmplMax = '';

                    if (!$attrs.required) {
                        requiredClass = "";
                    }
                    // template or max length
                    if ($attrs.maxlength) {
                        // set the typed value
                        var max = $attrs.maxlength;
                            $scope.chars = $attrs.value.length || 0;

                        // set of typed values should be after input element
                        var tmplMax = '<span class="js-char-counter {{flErrorClass}}">' +
                            '<span class="js-type">{{chars}}</span>/' + max + '</span>';

                        var errorMessages = '<span class="fl-frm__lbl-txt--error ng-show="isError">{{flErrors}}</span>';

                        tmplMax = $compile(tmplMax)($scope);
                        errorMessages = $compile(errorMessages)($scope);

                    }

                    $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
                        .after(tmplMax)
                        .addClass('fl-frm__el fl-frm__el--txt')
                        .after('<span class="fl-frm__lbl-txt">' + placeholderVal + '</span>')
                        .after(errorMessages);

                    // If we are on the edit mode we should add the label
                    if ($attrs.value && $attrs.value.length > 0) {
                        $element.addClass('js-field-has-value');
                    }
                    // Change the counter value if maxlength is set in the Gui
                    $element.bind('keypress keyup', function(event) {
                        $scope.chars = event.target.value.length;
                        $scope.$apply();
                    });
                    // If we type a key we add the floating label
                    $element.bind('keyup blur', function(event) {
                        return event.target.value.length ? $element.addClass('js-field-has-value') : $element.removeClass('js-field-has-value');
                    });
                }
            };
        })
        .controller('updateMaxCount', function($attrs) {
            var vm = this;
            vm.chars = $attrs.value.length;
        })
        // Adding a tooltip directive
        .directive('flTip', function() {
            // it doesn't depend on whatever you are passing to it
            // it will simply work
            return {
                scope: false,
                restrict: 'A',
                priority: 2, // runs at a higher priority otherwise it won't get into the label
                link: function($scope, $element, $attrs) {
                    // We are getting the value then assigning it to something and appending it
                    $element.after('<span class="fl-frm__tooltip">' + $attrs.flTip + '</span>');
                }
            };
        })
        .directive('flSelect', function() {
            return {
                restrict: 'A',
                priority: 1,
                link: function($scope, $element, $attrs) {
                    var placeholderVal = $element.find('options')[0] || 'Add a default item';
                    var requiredClass = 'fl-frm__lbl--required';

                    if (!$attrs.required) {
                        requiredClass = "";
                    }
                    // TODO check the select arrow here
                    $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
                        .addClass('fl-frm__el fl-frm__el--sel placeholder')
                        .after('<span class="fl-frm__lbl-txt">' + placeholderVal + '</span>');
                }
            }
        });
    })();
