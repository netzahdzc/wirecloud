/*
 *     Copyright (c) 2008-2016 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of Wirecloud Platform.
 *
 *     Wirecloud Platform is free software: you can redistribute it and/or
 *     modify it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     Wirecloud is distributed in the hope that it will be useful, but WITHOUT
 *     ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *     FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 *     License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with Wirecloud Platform.  If not, see
 *     <http://www.gnu.org/licenses/>.
 *
 */

/* globals StyledElements */


(function (se, utils) {

    "use strict";

    // ==================================================================================
    // CLASS DEFINITION
    // ==================================================================================

    se.ObjectWithEvents = utils.defineClass({

        /**
         * Create a new instance of class ObjectWithEvents
         * @mixin
         *
         * @name StyledElements.ObjectWithEvents
         * @param {String[]} names List of event names to handle
         */
        constructor: function ObjectWithEvents(names) {
            this.events = {};

            (Array.isArray(names) ? names : []).forEach(function (name) {
                this.events[name] = new se.Event(this);
            }, this);
        },

        members: /** @lends StyledElements.ObjectWithEvents.prototype */ {

            /**
             * Execute all event handlers attached for the existing event.
             * @since 0.6
             *
             * @param {String} name
             *      A string containing a existing event.
             * @returns {StyledElements.ObjectWithEvents}
             *      The instance on which the member is called.
             */
            trigger: function trigger(name) {
                var handlerArgs;

                if (!(name in this.events)) {
                    throw new Error(utils.interpolate("Unhandled event '%(name)s'", {
                        name: name
                    }));
                }

                handlerArgs = [this].concat(Array.prototype.slice.call(arguments, 1));
                this.events[name].trigger.apply(this.events[name], handlerArgs);

                return this;
            },

            /**
             * Attach an event handler for a given event.
             * @since 0.5
             *
             * @param {String} name
             *      Event name
             * @param {Function} handler
             *      An event handler to execute when the event is triggered
             * @returns {StyledElements.ObjectWithEvents}
             *      The instance on which the member is called
             */
            addEventListener: function addEventListener(name, handler) {

                if (!(name in this.events)) {
                    throw new Error(utils.interpolate("Unhandled event '%(name)s'", {
                        name: name
                    }));
                }

                this.events[name].addEventListener(handler);

                return this;
            },

            /**
             * Remove all event handlers for a given event
             * @since 0.5
             *
             * @param {String} name
             *      event name
             * @returns {StyledElements.ObjectWithEvents}
             *      The instance on which the member is called
             */
            clearEventListeners: function clearEventListeners(name) {

                if (typeof name !== 'string') {
                    for (name in this.events) {
                        this.events[name].clearEventListeners();
                    }

                    return this;
                }

                if (!(name in this.events)) {
                    throw new Error(utils.interpolate("Unhandled event '%(name)s'", {
                        name: name
                    }));
                }

                this.events[name].clearEventListeners();

                return this;
            },

            /**
             * @deprecated since version 0.6
             */
            destroy: function destroy() {
                this.events = null;

                return this;
            },

            /**
             * Remove an event handler from an event
             * @since 0.5
             *
             * @param {String} name
             *      Event name
             * @param {Function} handler
             *      A previously attached event
             * @returns {StyledElements.ObjectWithEvents}
             *      The instance on which the member is called
             */
            removeEventListener: function removeEventListener(name, handler) {

                if (!(name in this.events)) {
                    throw new Error(utils.interpolate("Unhandled event '%(name)s'", {
                        name: name
                    }));
                }

                this.events[name].removeEventListener(handler);

                return this;
            }

        }

    });

})(StyledElements, StyledElements.Utils);
