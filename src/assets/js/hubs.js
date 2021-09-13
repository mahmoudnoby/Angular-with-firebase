/*!
 * ASP.NET SignalR JavaScript Library v2.2.1
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['crmNotificationHub'] = this.createHubProxy('crmNotificationHub'); 
        proxies['crmNotificationHub'].client = { };
        proxies['crmNotificationHub'].server = {
            broadcast: function (notification) {
                return proxies['crmNotificationHub'].invoke.apply(proxies['crmNotificationHub'], $.merge(["Broadcast"], $.makeArray(arguments)));
             },

            cbtBroadcast: function (notification) {
                return proxies['crmNotificationHub'].invoke.apply(proxies['crmNotificationHub'], $.merge(["CbtBroadcast"], $.makeArray(arguments)));
             },

            crmBroadcastMessage: function (message) {
                return proxies['crmNotificationHub'].invoke.apply(proxies['crmNotificationHub'], $.merge(["CrmBroadcastMessage"], $.makeArray(arguments)));
             },

            crmSendNotificationToUser: function (id, notification) {
                return proxies['crmNotificationHub'].invoke.apply(proxies['crmNotificationHub'], $.merge(["CrmSendNotificationToUser"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['crmNotificationHub'].invoke.apply(proxies['crmNotificationHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             }
        };

        proxies['liveStreamingHub'] = this.createHubProxy('liveStreamingHub'); 
        proxies['liveStreamingHub'].client = { };
        proxies['liveStreamingHub'].server = {
            broadcastLiveStreaming: function (data) {
                return proxies['liveStreamingHub'].invoke.apply(proxies['liveStreamingHub'], $.merge(["BroadcastLiveStreaming"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['liveStreamingHub'].invoke.apply(proxies['liveStreamingHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             },

            sendToUser: function (id, message) {
                return proxies['liveStreamingHub'].invoke.apply(proxies['liveStreamingHub'], $.merge(["SendToUser"], $.makeArray(arguments)));
             }
        };

        proxies['mapHub'] = this.createHubProxy('mapHub'); 
        proxies['mapHub'].client = { };
        proxies['mapHub'].server = {
            android: function (data) {
                return proxies['mapHub'].invoke.apply(proxies['mapHub'], $.merge(["Android"], $.makeArray(arguments)));
             },

            broadcastMessage: function (hash) {
                return proxies['mapHub'].invoke.apply(proxies['mapHub'], $.merge(["BroadcastMessage"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['mapHub'].invoke.apply(proxies['mapHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             }
        };

        proxies['notificationHub'] = this.createHubProxy('notificationHub'); 
        proxies['notificationHub'].client = { };
        proxies['notificationHub'].server = {
            broadcast: function (notification) {
                return proxies['notificationHub'].invoke.apply(proxies['notificationHub'], $.merge(["Broadcast"], $.makeArray(arguments)));
             },

            notificationSendTouser: function (id, notification) {
                return proxies['notificationHub'].invoke.apply(proxies['notificationHub'], $.merge(["NotificationSendTouser"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['notificationHub'].invoke.apply(proxies['notificationHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             }
        };

        proxies['paymentHub'] = this.createHubProxy('paymentHub'); 
        proxies['paymentHub'].client = { };
        proxies['paymentHub'].server = {
            android: function (data) {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["Android"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             },

            sendPaymentAuthenticationUrl: function (id, url) {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["SendPaymentAuthenticationUrl"], $.makeArray(arguments)));
             },

            sendPaymentData: function (id, payment) {
                return proxies['paymentHub'].invoke.apply(proxies['paymentHub'], $.merge(["SendPaymentData"], $.makeArray(arguments)));
             }
        };

        proxies['reservationRequestHub'] = this.createHubProxy('reservationRequestHub'); 
        proxies['reservationRequestHub'].client = { };
        proxies['reservationRequestHub'].server = {
            groupBroadcast: function (groupName, message, type) {
                return proxies['reservationRequestHub'].invoke.apply(proxies['reservationRequestHub'], $.merge(["GroupBroadcast"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['reservationRequestHub'].invoke.apply(proxies['reservationRequestHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             },

            sendToUser: function (id, message, type) {
                return proxies['reservationRequestHub'].invoke.apply(proxies['reservationRequestHub'], $.merge(["SendToUser"], $.makeArray(arguments)));
             },

            subscribeToGroup: function (id, groupName) {
                return proxies['reservationRequestHub'].invoke.apply(proxies['reservationRequestHub'], $.merge(["SubscribeToGroup"], $.makeArray(arguments)));
             },

            unsubscribeToGroup: function (id, groupName) {
                return proxies['reservationRequestHub'].invoke.apply(proxies['reservationRequestHub'], $.merge(["UnsubscribeToGroup"], $.makeArray(arguments)));
             }
        };

        proxies['videoRequestHub'] = this.createHubProxy('videoRequestHub'); 
        proxies['videoRequestHub'].client = { };
        proxies['videoRequestHub'].server = {
            groupBroadcast: function (groupName, message, type) {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["GroupBroadcast"], $.makeArray(arguments)));
             },

            isClientExist: function (id) {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["IsClientExist"], $.makeArray(arguments)));
             },

            readConnectionDetails: function () {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["ReadConnectionDetails"], $.makeArray(arguments)));
             },

            sendExtensionToUser: function (id, extension) {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["SendExtensionToUser"], $.makeArray(arguments)));
             },

            sendToUser: function (id, message, type) {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["SendToUser"], $.makeArray(arguments)));
             },

            subscribeToGroup: function (id, groupName) {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["SubscribeToGroup"], $.makeArray(arguments)));
             },

            unsubscribeToGroup: function (id, groupName) {
                return proxies['videoRequestHub'].invoke.apply(proxies['videoRequestHub'], $.merge(["UnsubscribeToGroup"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/Hubs/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));