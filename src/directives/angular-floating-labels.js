(function() {
'use strict';
angular.module('app.directives.floatinglabels', [])
    .directive('flLabel', function($compile) {
            // Runs during compile
            return {
                restrict: 'A',
                transclude: true,
                priority: 1,
                controller: 'updateMaxCount',
                scope: {
                    count: "=count",
                    something: '@something'
                },
                template: '<span class="js-char-counter"><span class="js-typed">{{count}}</span>/{{max}}</span>',
                link: function($scope, $element, $attrs) {
                    // if the placholder is not specified by the controller scope then it will pickup
                    // the one statically existing on the page otheriwse the directive default will be
                    // assigned to the placeholder
                    var placeholderVal = $attrs.placeholder || $scope.customPlaceholder;
                    var requiredClass = 'fl-frm__lbl--required';
                    var count = 0,
                        something = 0;

                    if (!$attrs.required) {
                        requiredClass = "";
                    }
                    // template or max length
                    if ($attrs.maxlength) {
                        // set the typed value
                        var max = $attrs.maxlength,
                            typed = $attrs.value.length || 0;
                        // set of typed values should be after input element
                        var tmplMax = '<span class="js-char-counter">' +
                            '<span class="js-typed">{{something}}</span>/' + max + '</span>';
                        tmplMax = $compile(tmplMax)($scope);
                    } else {
                        var tmplMax = '';
                    }

                    $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
                        .addClass('fl-frm__el fl-frm__el--txt')
                        .after(tmplMax)
                        .after('<span class="fl-frm__lbl-txt">' + placeholderVal + '</span>')
                        .after('<span class="fl-frm__lbl-txt--error">Only numbers are allowed</span>');

                    // If we are on the edit mode we should add the label
                    if ($attrs.value && $attrs.value.length > 0) {
                        $element.addClass('js-field-has-value');
                    }

                    $element.bind('keyup', function(event) {
                        $scope.something = event.target.value.length;
                        $scope.$apply();
                    });
                    // If we type a key we add the floating label
                    $element.bind('keyup blur', function(event) {
                        return event.target.value.length ? $element.addClass('js-field-has-value') : $element.removeClass('js-field-has-value');
                    });
                }
            };
        })
        .controller('updateMaxCount', function($scope, $element, $attrs) {
            $scope.something = $attrs.value.length;
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
            // implemenet later
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
