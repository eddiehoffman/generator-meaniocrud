'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    <%= crud_name_upper %> = mongoose.model('<%= crud_name_upper %>'),
    _ = require('lodash');

module.exports = function(<%= crud_name_upper %>s) {

    return {
        /**
         * Find <%= crud_name_lower %> by id
         */
        <%= crud_name_lower %>: function(req, res, next, id) {
            <%= crud_name_upper %>.load(id, function(err, <%= crud_name_lower %>) {
                if (err) return next(err);
                if (!<%= crud_name_lower %>) return next(new Error('Failed to load <%= crud_name_lower %> ' + id));
                req.<%= crud_name_lower %> = <%= crud_name_lower %>;
                next();
            });
        },
        /**
         * Create an <%= crud_name_lower %>
         */
        create: function(req, res) {
            var <%= crud_name_lower %> = new <%= crud_name_upper %>(req.body);
            <%= crud_name_lower %>.user = req.user;

            <%= crud_name_lower %>.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the <%= crud_name_lower %>'
                    });
                }

                <%= crud_name_upper %>s.events.publish('create', {
                    description: req.user.name + ' created ' + req.body.title + ' <%= crud_name_lower %>.'
                });

                res.json(<%= crud_name_lower %>);
            });
        },
        /**
         * Update an <%= crud_name_lower %>
         */
        update: function(req, res) {
            var <%= crud_name_lower %> = req.<%= crud_name_lower %>;

            <%= crud_name_lower %> = _.extend(<%= crud_name_lower %>, req.body);


            <%= crud_name_lower %>.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the <%= crud_name_lower %>'
                    });
                }

                <%= crud_name_upper %>s.events.publish('update', {
                    description: req.user.name + ' updated ' + req.body.title + ' <%= crud_name_lower %>.'
                });

                res.json(<%= crud_name_lower %>);
            });
        },
        /**
         * Delete an <%= crud_name_lower %>
         */
        destroy: function(req, res) {
            var <%= crud_name_lower %> = req.<%= crud_name_lower %>;


            <%= crud_name_lower %>.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the <%= crud_name_lower %>'
                    });
                }

                <%= crud_name_upper %>s.events.publish('remove', {
                    description: req.user.name + ' deleted ' + <%= crud_name_lower %>.title + ' <%= crud_name_lower %>.'
                });

                res.json(<%= crud_name_lower %>);
            });
        },
        /**
         * Show an <%= crud_name_lower %>
         */
        show: function(req, res) {

            <%= crud_name_upper %>s.events.publish('view', {
                description: req.user.name + ' read ' + req.<%= crud_name_lower %>.title + ' <%= crud_name_lower %>.'
            });

            res.json(req.<%= crud_name_lower %>);
        },
        /**
         * List of <%= crud_name_upper %>s
         */
        all: function(req, res) {
            var query = req.acl.query('<%= crud_name_upper %>');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, <%= crud_name_lower %>s) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the <%= crud_name_lower %>s'
                    });
                }

                res.json(<%= crud_name_lower %>s)
            });

        }
    };
}
