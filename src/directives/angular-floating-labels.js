(function() {
    'use strict';
    angular.module('app.directives.floatinglabels', [])
        .directive('flLabel', function($compile) {
            return {
                restrict: 'A',
                priority: 1,
                controller: 'updateMaxCount',
                require: ['^form', 'ngModel'],
                scope: {
                    count: "=count",
                    chars: '@chars',
                },
                link: function($scope, $element, $attrs, $formCtrl) {
                    var placeholderVal = $attrs.placeholder,
                        requiredClass = 'fl-frm__lbl--required',
                        count = 0,
                        something = 0,
                        tmplMax = '';

                    if (!$attrs.required) {
                        requiredClass = "";
                    }
                    // template or max length
                    if ($attrs.maxlength) {
                        // set the typed value
                        var max = $attrs.maxlength,
                            errorClass = '';
                        $scope.chars = $attrs.value.length;

                        if ($scope.chars >= $attrs.maxLength - 5) {
                            errorClass = 'js-char-counter-max';
                        }
                        // set of typed values should be after input element
                        var tmplMax = '<span class="js-char-counter ' + errorClass + '">' +
                            '<span class="js-type">{{chars}}</span>/' + max + '</span>';

                        tmplMax = $compile(tmplMax)($scope);
                    }

                    $element.wrap('<label class="fl-frm__lbl ' + requiredClass + '">')
                        .after(tmplMax)
                        .addClass('fl-frm__el fl-frm__el--txt')
                        .after('<span class="fl-frm__lbl-txt">' + placeholderVal + '</span>');

                    // If we are on the edit mode we should add the label
                    if ($attrs.value && $attrs.value.length > 0) {
                        // Add a floating label
                        addFl();
                    }
                    // Change the counter value if maxlength is set in the Gui
                    $element.bind('keypress keyup', function(event) {
                        // Not permitted to type a string in a number type input
                        if ($attrs.type === "number") {
                            var val = event.target.value;
                            if (!parseInt(val, 10)) {
                                // erase all
                                event.target.value = val.substr(1, val.length - 1);
                            }
                        }
                        $scope.chars = event.target.value.length;
                        $scope.$apply();
                    });
                    // If we type a key we add the floating label
                    $element.bind('keyup blur', function(event) {
                        return event.target.value.length > 0 ? addFl() : removeFl();
                    });

                    // Add a floating label class
                    function addFl() {
                            $element.addClass('js-field-has-value');
                        }
                        // remove a floating label class
                    function removeFl() {
                        $element.removeClass('js-field-has-value');
                    }
                }
            };
        })
        .controller('updateMaxCount', function($attrs) {
            var vm = this;
            vm.chars = $attrs.value.length;
        })
        // Adding a tooltip directive
        .directive('flTip', function() {
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
            };
        })
        .directive('flCheckbox', function() {
            return {
                restrict: 'E',
                transclude: true,
                require: 'ngModel',
                scope: {
                    label: '@',
                    checked: '@',
                    ngModel: '=ngModel'
                },
                templateUrl: 'src/directives/angular-floating-labels-checkbox.html',
                link: function ($scope) {
                    $scope.checkboxLabel = $scope.label;
                    $scope.checked = $scope.ngModel;
                    console.log('the checked value is', $scope.checked, $scope.ngModel);
                }
            }
        })
        // Directive for radit buttons
        .directive('flRadio', function() {
            return {
                priority: 1,
                restrict: 'A',
                link: function($scope, $element, $attrs) {
                    var tmpl = '<span class="fl-frm__lbl-txt--bool fl-frm__lbl-txt--bool--radio"></span>',
                        radioLabl = '<span class="fl-frm__lbl-txt--bool__data-label">' +
                        $attrs.label +
                        '</span>';
                    $element.addClass('fl-frm__el--bool')
                        .wrap('<label class="fl-frm__lbl fl-frm__lbl--bool">')
                        .after(radioLabl)
                        .after(tmpl);
                }
            }
        });
})();
