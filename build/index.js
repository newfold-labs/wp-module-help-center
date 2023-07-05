(() => {
  var e = {
      331: (e) => {
        function t() {
          (this._events = this._events || {}),
            (this._maxListeners = this._maxListeners || void 0);
        }
        function r(e) {
          return "function" == typeof e;
        }
        function n(e) {
          return "object" == typeof e && null !== e;
        }
        function i(e) {
          return void 0 === e;
        }
        (e.exports = t),
          (t.prototype._events = void 0),
          (t.prototype._maxListeners = void 0),
          (t.defaultMaxListeners = 10),
          (t.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || isNaN(e))
              throw TypeError("n must be a positive number");
            return (this._maxListeners = e), this;
          }),
          (t.prototype.emit = function (e) {
            var t, a, c, s, o, u;
            if (
              (this._events || (this._events = {}),
              "error" === e &&
                (!this._events.error ||
                  (n(this._events.error) && !this._events.error.length)))
            ) {
              if ((t = arguments[1]) instanceof Error) throw t;
              var l = new Error(
                'Uncaught, unspecified "error" event. (' + t + ")"
              );
              throw ((l.context = t), l);
            }
            if (i((a = this._events[e]))) return !1;
            if (r(a))
              switch (arguments.length) {
                case 1:
                  a.call(this);
                  break;
                case 2:
                  a.call(this, arguments[1]);
                  break;
                case 3:
                  a.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  (s = Array.prototype.slice.call(arguments, 1)),
                    a.apply(this, s);
              }
            else if (n(a))
              for (
                s = Array.prototype.slice.call(arguments, 1),
                  c = (u = a.slice()).length,
                  o = 0;
                o < c;
                o++
              )
                u[o].apply(this, s);
            return !0;
          }),
          (t.prototype.addListener = function (e, a) {
            var c;
            if (!r(a)) throw TypeError("listener must be a function");
            return (
              this._events || (this._events = {}),
              this._events.newListener &&
                this.emit("newListener", e, r(a.listener) ? a.listener : a),
              this._events[e]
                ? n(this._events[e])
                  ? this._events[e].push(a)
                  : (this._events[e] = [this._events[e], a])
                : (this._events[e] = a),
              n(this._events[e]) &&
                !this._events[e].warned &&
                (c = i(this._maxListeners)
                  ? t.defaultMaxListeners
                  : this._maxListeners) &&
                c > 0 &&
                this._events[e].length > c &&
                ((this._events[e].warned = !0),
                console.error(
                  "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                  this._events[e].length
                ),
                "function" == typeof console.trace && console.trace()),
              this
            );
          }),
          (t.prototype.on = t.prototype.addListener),
          (t.prototype.once = function (e, t) {
            if (!r(t)) throw TypeError("listener must be a function");
            var n = !1;
            function i() {
              this.removeListener(e, i),
                n || ((n = !0), t.apply(this, arguments));
            }
            return (i.listener = t), this.on(e, i), this;
          }),
          (t.prototype.removeListener = function (e, t) {
            var i, a, c, s;
            if (!r(t)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[e]) return this;
            if (
              ((c = (i = this._events[e]).length),
              (a = -1),
              i === t || (r(i.listener) && i.listener === t))
            )
              delete this._events[e],
                this._events.removeListener &&
                  this.emit("removeListener", e, t);
            else if (n(i)) {
              for (s = c; s-- > 0; )
                if (i[s] === t || (i[s].listener && i[s].listener === t)) {
                  a = s;
                  break;
                }
              if (a < 0) return this;
              1 === i.length
                ? ((i.length = 0), delete this._events[e])
                : i.splice(a, 1),
                this._events.removeListener &&
                  this.emit("removeListener", e, t);
            }
            return this;
          }),
          (t.prototype.removeAllListeners = function (e) {
            var t, n;
            if (!this._events) return this;
            if (!this._events.removeListener)
              return (
                0 === arguments.length
                  ? (this._events = {})
                  : this._events[e] && delete this._events[e],
                this
              );
            if (0 === arguments.length) {
              for (t in this._events)
                "removeListener" !== t && this.removeAllListeners(t);
              return (
                this.removeAllListeners("removeListener"),
                (this._events = {}),
                this
              );
            }
            if (r((n = this._events[e]))) this.removeListener(e, n);
            else if (n)
              for (; n.length; ) this.removeListener(e, n[n.length - 1]);
            return delete this._events[e], this;
          }),
          (t.prototype.listeners = function (e) {
            return this._events && this._events[e]
              ? r(this._events[e])
                ? [this._events[e]]
                : this._events[e].slice()
              : [];
          }),
          (t.prototype.listenerCount = function (e) {
            if (this._events) {
              var t = this._events[e];
              if (r(t)) return 1;
              if (t) return t.length;
            }
            return 0;
          }),
          (t.listenerCount = function (e, t) {
            return e.listenerCount(t);
          });
      },
      131: (e, t, r) => {
        "use strict";
        var n = r(374),
          i = r(775),
          a = r(76);
        function c(e, t, r) {
          return new n(e, t, r);
        }
        (c.version = r(336)),
          (c.AlgoliaSearchHelper = n),
          (c.SearchParameters = i),
          (c.SearchResults = a),
          (e.exports = c);
      },
      78: (e, t, r) => {
        "use strict";
        var n = r(331);
        function i(e, t) {
          (this.main = e), (this.fn = t), (this.lastResults = null);
        }
        r(853)(i, n),
          (i.prototype.detach = function () {
            this.removeAllListeners(), this.main.detachDerivedHelper(this);
          }),
          (i.prototype.getModifiedState = function (e) {
            return this.fn(e);
          }),
          (e.exports = i);
      },
      437: (e, t, r) => {
        "use strict";
        var n = r(344),
          i = r(803),
          a = r(116),
          c = {
            addRefinement: function (e, t, r) {
              if (c.isRefined(e, t, r)) return e;
              var i = "" + r,
                a = e[t] ? e[t].concat(i) : [i],
                s = {};
              return (s[t] = a), n({}, s, e);
            },
            removeRefinement: function (e, t, r) {
              if (void 0 === r)
                return c.clearRefinement(e, function (e, r) {
                  return t === r;
                });
              var n = "" + r;
              return c.clearRefinement(e, function (e, r) {
                return t === r && n === e;
              });
            },
            toggleRefinement: function (e, t, r) {
              if (void 0 === r)
                throw new Error("toggleRefinement should be used with a value");
              return c.isRefined(e, t, r)
                ? c.removeRefinement(e, t, r)
                : c.addRefinement(e, t, r);
            },
            clearRefinement: function (e, t, r) {
              if (void 0 === t) return a(e) ? {} : e;
              if ("string" == typeof t) return i(e, [t]);
              if ("function" == typeof t) {
                var n = !1,
                  c = Object.keys(e).reduce(function (i, a) {
                    var c = e[a] || [],
                      s = c.filter(function (e) {
                        return !t(e, a, r);
                      });
                    return s.length !== c.length && (n = !0), (i[a] = s), i;
                  }, {});
                return n ? c : e;
              }
            },
            isRefined: function (e, t, r) {
              var n = !!e[t] && e[t].length > 0;
              if (void 0 === r || !n) return n;
              var i = "" + r;
              return -1 !== e[t].indexOf(i);
            },
          };
        e.exports = c;
      },
      775: (e, t, r) => {
        "use strict";
        var n = r(185),
          i = r(344),
          a = r(686),
          c = r(888),
          s = r(23),
          o = r(803),
          u = r(116),
          l = r(801),
          f = r(437);
        function h(e, t) {
          return Array.isArray(e) && Array.isArray(t)
            ? e.length === t.length &&
                e.every(function (e, r) {
                  return h(t[r], e);
                })
            : e === t;
        }
        function d(e) {
          var t = e ? d._parseNumbers(e) : {};
          void 0 === t.userToken ||
            l(t.userToken) ||
            console.warn(
              "[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}"
            ),
            (this.facets = t.facets || []),
            (this.disjunctiveFacets = t.disjunctiveFacets || []),
            (this.hierarchicalFacets = t.hierarchicalFacets || []),
            (this.facetsRefinements = t.facetsRefinements || {}),
            (this.facetsExcludes = t.facetsExcludes || {}),
            (this.disjunctiveFacetsRefinements =
              t.disjunctiveFacetsRefinements || {}),
            (this.numericRefinements = t.numericRefinements || {}),
            (this.tagRefinements = t.tagRefinements || []),
            (this.hierarchicalFacetsRefinements =
              t.hierarchicalFacetsRefinements || {});
          var r = this;
          Object.keys(t).forEach(function (e) {
            var n = -1 !== d.PARAMETERS.indexOf(e),
              i = void 0 !== t[e];
            !n && i && (r[e] = t[e]);
          });
        }
        (d.PARAMETERS = Object.keys(new d())),
          (d._parseNumbers = function (e) {
            if (e instanceof d) return e;
            var t = {};
            if (
              ([
                "aroundPrecision",
                "aroundRadius",
                "getRankingInfo",
                "minWordSizefor2Typos",
                "minWordSizefor1Typo",
                "page",
                "maxValuesPerFacet",
                "distinct",
                "minimumAroundRadius",
                "hitsPerPage",
                "minProximity",
              ].forEach(function (r) {
                var n = e[r];
                if ("string" == typeof n) {
                  var i = parseFloat(n);
                  t[r] = isNaN(i) ? n : i;
                }
              }),
              Array.isArray(e.insideBoundingBox) &&
                (t.insideBoundingBox = e.insideBoundingBox.map(function (e) {
                  return Array.isArray(e)
                    ? e.map(function (e) {
                        return parseFloat(e);
                      })
                    : e;
                })),
              e.numericRefinements)
            ) {
              var r = {};
              Object.keys(e.numericRefinements).forEach(function (t) {
                var n = e.numericRefinements[t] || {};
                (r[t] = {}),
                  Object.keys(n).forEach(function (e) {
                    var i = n[e].map(function (e) {
                      return Array.isArray(e)
                        ? e.map(function (e) {
                            return "string" == typeof e ? parseFloat(e) : e;
                          })
                        : "string" == typeof e
                        ? parseFloat(e)
                        : e;
                    });
                    r[t][e] = i;
                  });
              }),
                (t.numericRefinements = r);
            }
            return n({}, e, t);
          }),
          (d.make = function (e) {
            var t = new d(e);
            return (
              (e.hierarchicalFacets || []).forEach(function (e) {
                if (e.rootPath) {
                  var r = t.getHierarchicalRefinement(e.name);
                  r.length > 0 &&
                    0 !== r[0].indexOf(e.rootPath) &&
                    (t = t.clearRefinements(e.name)),
                    0 === (r = t.getHierarchicalRefinement(e.name)).length &&
                      (t = t.toggleHierarchicalFacetRefinement(
                        e.name,
                        e.rootPath
                      ));
                }
              }),
              t
            );
          }),
          (d.validate = function (e, t) {
            var r = t || {};
            return e.tagFilters &&
              r.tagRefinements &&
              r.tagRefinements.length > 0
              ? new Error(
                  "[Tags] Cannot switch from the managed tag API to the advanced API. It is probably an error, if it is really what you want, you should first clear the tags with clearTags method."
                )
              : e.tagRefinements.length > 0 && r.tagFilters
              ? new Error(
                  "[Tags] Cannot switch from the advanced tag API to the managed API. It is probably an error, if it is not, you should first clear the tags with clearTags method."
                )
              : e.numericFilters &&
                r.numericRefinements &&
                u(r.numericRefinements)
              ? new Error(
                  "[Numeric filters] Can't switch from the advanced to the managed API. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
                )
              : u(e.numericRefinements) && r.numericFilters
              ? new Error(
                  "[Numeric filters] Can't switch from the managed API to the advanced. It is probably an error, if this is really what you want, you have to first clear the numeric filters."
                )
              : null;
          }),
          (d.prototype = {
            constructor: d,
            clearRefinements: function (e) {
              var t = {
                numericRefinements: this._clearNumericRefinements(e),
                facetsRefinements: f.clearRefinement(
                  this.facetsRefinements,
                  e,
                  "conjunctiveFacet"
                ),
                facetsExcludes: f.clearRefinement(
                  this.facetsExcludes,
                  e,
                  "exclude"
                ),
                disjunctiveFacetsRefinements: f.clearRefinement(
                  this.disjunctiveFacetsRefinements,
                  e,
                  "disjunctiveFacet"
                ),
                hierarchicalFacetsRefinements: f.clearRefinement(
                  this.hierarchicalFacetsRefinements,
                  e,
                  "hierarchicalFacet"
                ),
              };
              return t.numericRefinements === this.numericRefinements &&
                t.facetsRefinements === this.facetsRefinements &&
                t.facetsExcludes === this.facetsExcludes &&
                t.disjunctiveFacetsRefinements ===
                  this.disjunctiveFacetsRefinements &&
                t.hierarchicalFacetsRefinements ===
                  this.hierarchicalFacetsRefinements
                ? this
                : this.setQueryParameters(t);
            },
            clearTags: function () {
              return void 0 === this.tagFilters &&
                0 === this.tagRefinements.length
                ? this
                : this.setQueryParameters({
                    tagFilters: void 0,
                    tagRefinements: [],
                  });
            },
            setIndex: function (e) {
              return e === this.index
                ? this
                : this.setQueryParameters({ index: e });
            },
            setQuery: function (e) {
              return e === this.query
                ? this
                : this.setQueryParameters({ query: e });
            },
            setPage: function (e) {
              return e === this.page
                ? this
                : this.setQueryParameters({ page: e });
            },
            setFacets: function (e) {
              return this.setQueryParameters({ facets: e });
            },
            setDisjunctiveFacets: function (e) {
              return this.setQueryParameters({ disjunctiveFacets: e });
            },
            setHitsPerPage: function (e) {
              return this.hitsPerPage === e
                ? this
                : this.setQueryParameters({ hitsPerPage: e });
            },
            setTypoTolerance: function (e) {
              return this.typoTolerance === e
                ? this
                : this.setQueryParameters({ typoTolerance: e });
            },
            addNumericRefinement: function (e, t, r) {
              var i = s(r);
              if (this.isNumericRefined(e, t, i)) return this;
              var a = n({}, this.numericRefinements);
              return (
                (a[e] = n({}, a[e])),
                a[e][t]
                  ? ((a[e][t] = a[e][t].slice()), a[e][t].push(i))
                  : (a[e][t] = [i]),
                this.setQueryParameters({ numericRefinements: a })
              );
            },
            getConjunctiveRefinements: function (e) {
              return (
                (this.isConjunctiveFacet(e) && this.facetsRefinements[e]) || []
              );
            },
            getDisjunctiveRefinements: function (e) {
              return (
                (this.isDisjunctiveFacet(e) &&
                  this.disjunctiveFacetsRefinements[e]) ||
                []
              );
            },
            getHierarchicalRefinement: function (e) {
              return this.hierarchicalFacetsRefinements[e] || [];
            },
            getExcludeRefinements: function (e) {
              return (
                (this.isConjunctiveFacet(e) && this.facetsExcludes[e]) || []
              );
            },
            removeNumericRefinement: function (e, t, r) {
              return void 0 !== r
                ? this.isNumericRefined(e, t, r)
                  ? this.setQueryParameters({
                      numericRefinements: this._clearNumericRefinements(
                        function (n, i) {
                          return i === e && n.op === t && h(n.val, s(r));
                        }
                      ),
                    })
                  : this
                : void 0 !== t
                ? this.isNumericRefined(e, t)
                  ? this.setQueryParameters({
                      numericRefinements: this._clearNumericRefinements(
                        function (r, n) {
                          return n === e && r.op === t;
                        }
                      ),
                    })
                  : this
                : this.isNumericRefined(e)
                ? this.setQueryParameters({
                    numericRefinements: this._clearNumericRefinements(function (
                      t,
                      r
                    ) {
                      return r === e;
                    }),
                  })
                : this;
            },
            getNumericRefinements: function (e) {
              return this.numericRefinements[e] || {};
            },
            getNumericRefinement: function (e, t) {
              return (
                this.numericRefinements[e] && this.numericRefinements[e][t]
              );
            },
            _clearNumericRefinements: function (e) {
              if (void 0 === e)
                return u(this.numericRefinements)
                  ? {}
                  : this.numericRefinements;
              if ("string" == typeof e) return o(this.numericRefinements, [e]);
              if ("function" == typeof e) {
                var t = !1,
                  r = this.numericRefinements,
                  n = Object.keys(r).reduce(function (n, i) {
                    var a = r[i],
                      c = {};
                    return (
                      (a = a || {}),
                      Object.keys(a).forEach(function (r) {
                        var n = a[r] || [],
                          s = [];
                        n.forEach(function (t) {
                          e({ val: t, op: r }, i, "numeric") || s.push(t);
                        }),
                          s.length !== n.length && (t = !0),
                          (c[r] = s);
                      }),
                      (n[i] = c),
                      n
                    );
                  }, {});
                return t ? n : this.numericRefinements;
              }
            },
            addFacet: function (e) {
              return this.isConjunctiveFacet(e)
                ? this
                : this.setQueryParameters({ facets: this.facets.concat([e]) });
            },
            addDisjunctiveFacet: function (e) {
              return this.isDisjunctiveFacet(e)
                ? this
                : this.setQueryParameters({
                    disjunctiveFacets: this.disjunctiveFacets.concat([e]),
                  });
            },
            addHierarchicalFacet: function (e) {
              if (this.isHierarchicalFacet(e.name))
                throw new Error(
                  "Cannot declare two hierarchical facets with the same name: `" +
                    e.name +
                    "`"
                );
              return this.setQueryParameters({
                hierarchicalFacets: this.hierarchicalFacets.concat([e]),
              });
            },
            addFacetRefinement: function (e, t) {
              if (!this.isConjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the facets attribute of the helper configuration"
                );
              return f.isRefined(this.facetsRefinements, e, t)
                ? this
                : this.setQueryParameters({
                    facetsRefinements: f.addRefinement(
                      this.facetsRefinements,
                      e,
                      t
                    ),
                  });
            },
            addExcludeRefinement: function (e, t) {
              if (!this.isConjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the facets attribute of the helper configuration"
                );
              return f.isRefined(this.facetsExcludes, e, t)
                ? this
                : this.setQueryParameters({
                    facetsExcludes: f.addRefinement(this.facetsExcludes, e, t),
                  });
            },
            addDisjunctiveFacetRefinement: function (e, t) {
              if (!this.isDisjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the disjunctiveFacets attribute of the helper configuration"
                );
              return f.isRefined(this.disjunctiveFacetsRefinements, e, t)
                ? this
                : this.setQueryParameters({
                    disjunctiveFacetsRefinements: f.addRefinement(
                      this.disjunctiveFacetsRefinements,
                      e,
                      t
                    ),
                  });
            },
            addTagRefinement: function (e) {
              if (this.isTagRefined(e)) return this;
              var t = { tagRefinements: this.tagRefinements.concat(e) };
              return this.setQueryParameters(t);
            },
            removeFacet: function (e) {
              return this.isConjunctiveFacet(e)
                ? this.clearRefinements(e).setQueryParameters({
                    facets: this.facets.filter(function (t) {
                      return t !== e;
                    }),
                  })
                : this;
            },
            removeDisjunctiveFacet: function (e) {
              return this.isDisjunctiveFacet(e)
                ? this.clearRefinements(e).setQueryParameters({
                    disjunctiveFacets: this.disjunctiveFacets.filter(function (
                      t
                    ) {
                      return t !== e;
                    }),
                  })
                : this;
            },
            removeHierarchicalFacet: function (e) {
              return this.isHierarchicalFacet(e)
                ? this.clearRefinements(e).setQueryParameters({
                    hierarchicalFacets: this.hierarchicalFacets.filter(
                      function (t) {
                        return t.name !== e;
                      }
                    ),
                  })
                : this;
            },
            removeFacetRefinement: function (e, t) {
              if (!this.isConjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the facets attribute of the helper configuration"
                );
              return f.isRefined(this.facetsRefinements, e, t)
                ? this.setQueryParameters({
                    facetsRefinements: f.removeRefinement(
                      this.facetsRefinements,
                      e,
                      t
                    ),
                  })
                : this;
            },
            removeExcludeRefinement: function (e, t) {
              if (!this.isConjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the facets attribute of the helper configuration"
                );
              return f.isRefined(this.facetsExcludes, e, t)
                ? this.setQueryParameters({
                    facetsExcludes: f.removeRefinement(
                      this.facetsExcludes,
                      e,
                      t
                    ),
                  })
                : this;
            },
            removeDisjunctiveFacetRefinement: function (e, t) {
              if (!this.isDisjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the disjunctiveFacets attribute of the helper configuration"
                );
              return f.isRefined(this.disjunctiveFacetsRefinements, e, t)
                ? this.setQueryParameters({
                    disjunctiveFacetsRefinements: f.removeRefinement(
                      this.disjunctiveFacetsRefinements,
                      e,
                      t
                    ),
                  })
                : this;
            },
            removeTagRefinement: function (e) {
              if (!this.isTagRefined(e)) return this;
              var t = {
                tagRefinements: this.tagRefinements.filter(function (t) {
                  return t !== e;
                }),
              };
              return this.setQueryParameters(t);
            },
            toggleRefinement: function (e, t) {
              return this.toggleFacetRefinement(e, t);
            },
            toggleFacetRefinement: function (e, t) {
              if (this.isHierarchicalFacet(e))
                return this.toggleHierarchicalFacetRefinement(e, t);
              if (this.isConjunctiveFacet(e))
                return this.toggleConjunctiveFacetRefinement(e, t);
              if (this.isDisjunctiveFacet(e))
                return this.toggleDisjunctiveFacetRefinement(e, t);
              throw new Error(
                "Cannot refine the undeclared facet " +
                  e +
                  "; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets"
              );
            },
            toggleConjunctiveFacetRefinement: function (e, t) {
              if (!this.isConjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the facets attribute of the helper configuration"
                );
              return this.setQueryParameters({
                facetsRefinements: f.toggleRefinement(
                  this.facetsRefinements,
                  e,
                  t
                ),
              });
            },
            toggleExcludeFacetRefinement: function (e, t) {
              if (!this.isConjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the facets attribute of the helper configuration"
                );
              return this.setQueryParameters({
                facetsExcludes: f.toggleRefinement(this.facetsExcludes, e, t),
              });
            },
            toggleDisjunctiveFacetRefinement: function (e, t) {
              if (!this.isDisjunctiveFacet(e))
                throw new Error(
                  e +
                    " is not defined in the disjunctiveFacets attribute of the helper configuration"
                );
              return this.setQueryParameters({
                disjunctiveFacetsRefinements: f.toggleRefinement(
                  this.disjunctiveFacetsRefinements,
                  e,
                  t
                ),
              });
            },
            toggleHierarchicalFacetRefinement: function (e, t) {
              if (!this.isHierarchicalFacet(e))
                throw new Error(
                  e +
                    " is not defined in the hierarchicalFacets attribute of the helper configuration"
                );
              var r = this._getHierarchicalFacetSeparator(
                  this.getHierarchicalFacetByName(e)
                ),
                n = {};
              return (
                void 0 !== this.hierarchicalFacetsRefinements[e] &&
                this.hierarchicalFacetsRefinements[e].length > 0 &&
                (this.hierarchicalFacetsRefinements[e][0] === t ||
                  0 === this.hierarchicalFacetsRefinements[e][0].indexOf(t + r))
                  ? -1 === t.indexOf(r)
                    ? (n[e] = [])
                    : (n[e] = [t.slice(0, t.lastIndexOf(r))])
                  : (n[e] = [t]),
                this.setQueryParameters({
                  hierarchicalFacetsRefinements: i(
                    {},
                    n,
                    this.hierarchicalFacetsRefinements
                  ),
                })
              );
            },
            addHierarchicalFacetRefinement: function (e, t) {
              if (this.isHierarchicalFacetRefined(e))
                throw new Error(e + " is already refined.");
              if (!this.isHierarchicalFacet(e))
                throw new Error(
                  e +
                    " is not defined in the hierarchicalFacets attribute of the helper configuration."
                );
              var r = {};
              return (
                (r[e] = [t]),
                this.setQueryParameters({
                  hierarchicalFacetsRefinements: i(
                    {},
                    r,
                    this.hierarchicalFacetsRefinements
                  ),
                })
              );
            },
            removeHierarchicalFacetRefinement: function (e) {
              if (!this.isHierarchicalFacetRefined(e)) return this;
              var t = {};
              return (
                (t[e] = []),
                this.setQueryParameters({
                  hierarchicalFacetsRefinements: i(
                    {},
                    t,
                    this.hierarchicalFacetsRefinements
                  ),
                })
              );
            },
            toggleTagRefinement: function (e) {
              return this.isTagRefined(e)
                ? this.removeTagRefinement(e)
                : this.addTagRefinement(e);
            },
            isDisjunctiveFacet: function (e) {
              return this.disjunctiveFacets.indexOf(e) > -1;
            },
            isHierarchicalFacet: function (e) {
              return void 0 !== this.getHierarchicalFacetByName(e);
            },
            isConjunctiveFacet: function (e) {
              return this.facets.indexOf(e) > -1;
            },
            isFacetRefined: function (e, t) {
              return (
                !!this.isConjunctiveFacet(e) &&
                f.isRefined(this.facetsRefinements, e, t)
              );
            },
            isExcludeRefined: function (e, t) {
              return (
                !!this.isConjunctiveFacet(e) &&
                f.isRefined(this.facetsExcludes, e, t)
              );
            },
            isDisjunctiveFacetRefined: function (e, t) {
              return (
                !!this.isDisjunctiveFacet(e) &&
                f.isRefined(this.disjunctiveFacetsRefinements, e, t)
              );
            },
            isHierarchicalFacetRefined: function (e, t) {
              if (!this.isHierarchicalFacet(e)) return !1;
              var r = this.getHierarchicalRefinement(e);
              return t ? -1 !== r.indexOf(t) : r.length > 0;
            },
            isNumericRefined: function (e, t, r) {
              if (void 0 === r && void 0 === t)
                return !!this.numericRefinements[e];
              var n =
                this.numericRefinements[e] &&
                void 0 !== this.numericRefinements[e][t];
              if (void 0 === r || !n) return n;
              var i,
                a,
                o = s(r),
                u =
                  void 0 !==
                  ((i = this.numericRefinements[e][t]),
                  (a = o),
                  c(i, function (e) {
                    return h(e, a);
                  }));
              return n && u;
            },
            isTagRefined: function (e) {
              return -1 !== this.tagRefinements.indexOf(e);
            },
            getRefinedDisjunctiveFacets: function () {
              var e = this,
                t = a(
                  Object.keys(this.numericRefinements).filter(function (t) {
                    return Object.keys(e.numericRefinements[t]).length > 0;
                  }),
                  this.disjunctiveFacets
                );
              return Object.keys(this.disjunctiveFacetsRefinements)
                .filter(function (t) {
                  return e.disjunctiveFacetsRefinements[t].length > 0;
                })
                .concat(t)
                .concat(this.getRefinedHierarchicalFacets());
            },
            getRefinedHierarchicalFacets: function () {
              var e = this;
              return a(
                this.hierarchicalFacets.map(function (e) {
                  return e.name;
                }),
                Object.keys(this.hierarchicalFacetsRefinements).filter(
                  function (t) {
                    return e.hierarchicalFacetsRefinements[t].length > 0;
                  }
                )
              );
            },
            getUnrefinedDisjunctiveFacets: function () {
              var e = this.getRefinedDisjunctiveFacets();
              return this.disjunctiveFacets.filter(function (t) {
                return -1 === e.indexOf(t);
              });
            },
            managedParameters: [
              "index",
              "facets",
              "disjunctiveFacets",
              "facetsRefinements",
              "hierarchicalFacets",
              "facetsExcludes",
              "disjunctiveFacetsRefinements",
              "numericRefinements",
              "tagRefinements",
              "hierarchicalFacetsRefinements",
            ],
            getQueryParams: function () {
              var e = this.managedParameters,
                t = {},
                r = this;
              return (
                Object.keys(this).forEach(function (n) {
                  var i = r[n];
                  -1 === e.indexOf(n) && void 0 !== i && (t[n] = i);
                }),
                t
              );
            },
            setQueryParameter: function (e, t) {
              if (this[e] === t) return this;
              var r = {};
              return (r[e] = t), this.setQueryParameters(r);
            },
            setQueryParameters: function (e) {
              if (!e) return this;
              var t = d.validate(this, e);
              if (t) throw t;
              var r = this,
                n = d._parseNumbers(e),
                i = Object.keys(this).reduce(function (e, t) {
                  return (e[t] = r[t]), e;
                }, {}),
                a = Object.keys(n).reduce(function (e, t) {
                  var r = void 0 !== e[t],
                    i = void 0 !== n[t];
                  return r && !i ? o(e, [t]) : (i && (e[t] = n[t]), e);
                }, i);
              return new this.constructor(a);
            },
            resetPage: function () {
              return void 0 === this.page ? this : this.setPage(0);
            },
            _getHierarchicalFacetSortBy: function (e) {
              return e.sortBy || ["isRefined:desc", "name:asc"];
            },
            _getHierarchicalFacetSeparator: function (e) {
              return e.separator || " > ";
            },
            _getHierarchicalRootPath: function (e) {
              return e.rootPath || null;
            },
            _getHierarchicalShowParentLevel: function (e) {
              return "boolean" != typeof e.showParentLevel || e.showParentLevel;
            },
            getHierarchicalFacetByName: function (e) {
              return c(this.hierarchicalFacets, function (t) {
                return t.name === e;
              });
            },
            getHierarchicalFacetBreadcrumb: function (e) {
              if (!this.isHierarchicalFacet(e)) return [];
              var t = this.getHierarchicalRefinement(e)[0];
              if (!t) return [];
              var r = this._getHierarchicalFacetSeparator(
                this.getHierarchicalFacetByName(e)
              );
              return t.split(r).map(function (e) {
                return e.trim();
              });
            },
            toString: function () {
              return JSON.stringify(this, null, 2);
            },
          }),
          (e.exports = d);
      },
      210: (e, t, r) => {
        "use strict";
        e.exports = function (e) {
          return function (t, r) {
            var c = e.hierarchicalFacets[r],
              u =
                (e.hierarchicalFacetsRefinements[c.name] &&
                  e.hierarchicalFacetsRefinements[c.name][0]) ||
                "",
              l = e._getHierarchicalFacetSeparator(c),
              f = e._getHierarchicalRootPath(c),
              h = e._getHierarchicalShowParentLevel(c),
              d = a(e._getHierarchicalFacetSortBy(c)),
              p = t.every(function (e) {
                return e.exhaustive;
              }),
              m = (function (e, t, r, a, c) {
                return function (u, l, f) {
                  var h = u;
                  if (f > 0) {
                    var d = 0;
                    for (h = u; d < f; ) {
                      var p = h && Array.isArray(h.data) ? h.data : [];
                      (h = i(p, function (e) {
                        return e.isRefined;
                      })),
                        d++;
                    }
                  }
                  if (h) {
                    var m = Object.keys(l.data)
                      .map(function (e) {
                        return [e, l.data[e]];
                      })
                      .filter(function (e) {
                        return (function (e, t, r, n, i, a) {
                          return (
                            (!i || (0 === e.indexOf(i) && i !== e)) &&
                            ((!i && -1 === e.indexOf(n)) ||
                              (i &&
                                e.split(n).length - i.split(n).length == 1) ||
                              (-1 === e.indexOf(n) && -1 === r.indexOf(n)) ||
                              0 === r.indexOf(e) ||
                              (0 === e.indexOf(t + n) &&
                                (a || 0 === e.indexOf(r))))
                          );
                        })(e[0], h.path || r, c, t, r, a);
                      });
                    h.data = n(
                      m.map(function (e) {
                        var r = e[0];
                        return (function (e, t, r, n, i) {
                          var a = t.split(r);
                          return {
                            name: a[a.length - 1].trim(),
                            path: t,
                            escapedValue: s(t),
                            count: e,
                            isRefined: n === t || 0 === n.indexOf(t + r),
                            exhaustive: i,
                            data: null,
                          };
                        })(e[1], r, t, o(c), l.exhaustive);
                      }),
                      e[0],
                      e[1]
                    );
                  }
                  return u;
                };
              })(d, l, f, h, u),
              g = t;
            return (
              f && (g = t.slice(f.split(l).length)),
              g.reduce(m, {
                name: e.hierarchicalFacets[r].name,
                count: null,
                isRefined: !0,
                path: null,
                escapedValue: null,
                exhaustive: p,
                data: null,
              })
            );
          };
        };
        var n = r(148),
          i = r(888),
          a = r(293),
          c = r(39),
          s = c.escapeFacetValue,
          o = c.unescapeFacetValue;
      },
      76: (e, t, r) => {
        "use strict";
        var n = r(185),
          i = r(344),
          a = r(148),
          c = r(587),
          s = r(888),
          o = r(725),
          u = r(293),
          l = r(39),
          f = l.escapeFacetValue,
          h = l.unescapeFacetValue,
          d = r(210);
        function p(e) {
          var t = {};
          return (
            e.forEach(function (e, r) {
              t[e] = r;
            }),
            t
          );
        }
        function m(e, t, r) {
          t && t[r] && (e.stats = t[r]);
        }
        function g(e, t, r) {
          var a = t[0];
          this._rawResults = t;
          var u = this;
          Object.keys(a).forEach(function (e) {
            u[e] = a[e];
          }),
            Object.keys(r || {}).forEach(function (e) {
              u[e] = r[e];
            }),
            (this.processingTimeMS = t.reduce(function (e, t) {
              return void 0 === t.processingTimeMS ? e : e + t.processingTimeMS;
            }, 0)),
            (this.disjunctiveFacets = []),
            (this.hierarchicalFacets = e.hierarchicalFacets.map(function () {
              return [];
            })),
            (this.facets = []);
          var l = e.getRefinedDisjunctiveFacets(),
            f = p(e.facets),
            g = p(e.disjunctiveFacets),
            y = 1,
            A = a.facets || {};
          Object.keys(A).forEach(function (t) {
            var r,
              n,
              i = A[t],
              c =
                ((r = e.hierarchicalFacets),
                (n = t),
                s(r, function (e) {
                  return (e.attributes || []).indexOf(n) > -1;
                }));
            if (c) {
              var l = c.attributes.indexOf(t),
                h = o(e.hierarchicalFacets, function (e) {
                  return e.name === c.name;
                });
              u.hierarchicalFacets[h][l] = {
                attribute: t,
                data: i,
                exhaustive: a.exhaustiveFacetsCount,
              };
            } else {
              var d,
                p = -1 !== e.disjunctiveFacets.indexOf(t),
                y = -1 !== e.facets.indexOf(t);
              p &&
                ((d = g[t]),
                (u.disjunctiveFacets[d] = {
                  name: t,
                  data: i,
                  exhaustive: a.exhaustiveFacetsCount,
                }),
                m(u.disjunctiveFacets[d], a.facets_stats, t)),
                y &&
                  ((d = f[t]),
                  (u.facets[d] = {
                    name: t,
                    data: i,
                    exhaustive: a.exhaustiveFacetsCount,
                  }),
                  m(u.facets[d], a.facets_stats, t));
            }
          }),
            (this.hierarchicalFacets = c(this.hierarchicalFacets)),
            l.forEach(function (r) {
              var c = t[y],
                s = c && c.facets ? c.facets : {},
                l = e.getHierarchicalFacetByName(r);
              Object.keys(s).forEach(function (t) {
                var r,
                  f = s[t];
                if (l) {
                  r = o(e.hierarchicalFacets, function (e) {
                    return e.name === l.name;
                  });
                  var d = o(u.hierarchicalFacets[r], function (e) {
                    return e.attribute === t;
                  });
                  if (-1 === d) return;
                  u.hierarchicalFacets[r][d].data = n(
                    {},
                    u.hierarchicalFacets[r][d].data,
                    f
                  );
                } else {
                  r = g[t];
                  var p = (a.facets && a.facets[t]) || {};
                  (u.disjunctiveFacets[r] = {
                    name: t,
                    data: i({}, f, p),
                    exhaustive: c.exhaustiveFacetsCount,
                  }),
                    m(u.disjunctiveFacets[r], c.facets_stats, t),
                    e.disjunctiveFacetsRefinements[t] &&
                      e.disjunctiveFacetsRefinements[t].forEach(function (n) {
                        !u.disjunctiveFacets[r].data[n] &&
                          e.disjunctiveFacetsRefinements[t].indexOf(h(n)) >
                            -1 &&
                          (u.disjunctiveFacets[r].data[n] = 0);
                      });
                }
              }),
                y++;
            }),
            e.getRefinedHierarchicalFacets().forEach(function (r) {
              var n = e.getHierarchicalFacetByName(r),
                a = e._getHierarchicalFacetSeparator(n),
                c = e.getHierarchicalRefinement(r);
              0 === c.length ||
                c[0].split(a).length < 2 ||
                t.slice(y).forEach(function (t) {
                  var r = t && t.facets ? t.facets : {};
                  Object.keys(r).forEach(function (t) {
                    var s = r[t],
                      l = o(e.hierarchicalFacets, function (e) {
                        return e.name === n.name;
                      }),
                      f = o(u.hierarchicalFacets[l], function (e) {
                        return e.attribute === t;
                      });
                    if (-1 !== f) {
                      var h = {};
                      if (c.length > 0) {
                        var d = c[0].split(a)[0];
                        h[d] = u.hierarchicalFacets[l][f].data[d];
                      }
                      u.hierarchicalFacets[l][f].data = i(
                        h,
                        s,
                        u.hierarchicalFacets[l][f].data
                      );
                    }
                  }),
                    y++;
                });
            }),
            Object.keys(e.facetsExcludes).forEach(function (t) {
              var r = e.facetsExcludes[t],
                n = f[t];
              (u.facets[n] = {
                name: t,
                data: a.facets[t],
                exhaustive: a.exhaustiveFacetsCount,
              }),
                r.forEach(function (e) {
                  (u.facets[n] = u.facets[n] || { name: t }),
                    (u.facets[n].data = u.facets[n].data || {}),
                    (u.facets[n].data[e] = 0);
                });
            }),
            (this.hierarchicalFacets = this.hierarchicalFacets.map(d(e))),
            (this.facets = c(this.facets)),
            (this.disjunctiveFacets = c(this.disjunctiveFacets)),
            (this._state = e);
        }
        function y(e, t) {
          function r(e) {
            return e.name === t;
          }
          if (e._state.isConjunctiveFacet(t)) {
            var n = s(e.facets, r);
            return n
              ? Object.keys(n.data).map(function (r) {
                  var i = f(r);
                  return {
                    name: r,
                    escapedValue: i,
                    count: n.data[r],
                    isRefined: e._state.isFacetRefined(t, i),
                    isExcluded: e._state.isExcludeRefined(t, r),
                  };
                })
              : [];
          }
          if (e._state.isDisjunctiveFacet(t)) {
            var i = s(e.disjunctiveFacets, r);
            return i
              ? Object.keys(i.data).map(function (r) {
                  var n = f(r);
                  return {
                    name: r,
                    escapedValue: n,
                    count: i.data[r],
                    isRefined: e._state.isDisjunctiveFacetRefined(t, n),
                  };
                })
              : [];
          }
          if (e._state.isHierarchicalFacet(t)) {
            var a = s(e.hierarchicalFacets, r);
            if (!a) return a;
            var c = e._state.getHierarchicalFacetByName(t),
              o = h(e._state.getHierarchicalRefinement(t)[0] || "").split(
                e._state._getHierarchicalFacetSeparator(c)
              );
            return o.unshift(t), A(a, o, 0), a;
          }
        }
        function A(e, t, r) {
          (e.isRefined = e.name === t[r]),
            e.data &&
              e.data.forEach(function (e) {
                A(e, t, r + 1);
              });
        }
        function b(e, t, r, n) {
          if (((n = n || 0), Array.isArray(t))) return e(t, r[n]);
          if (!t.data || 0 === t.data.length) return t;
          var a = t.data.map(function (t) {
              return b(e, t, r, n + 1);
            }),
            c = e(a, r[n]);
          return i({ data: c }, t);
        }
        function v(e, t) {
          var r = s(e, function (e) {
            return e.name === t;
          });
          return r && r.stats;
        }
        function I(e, t, r, n, i) {
          var a = s(i, function (e) {
              return e.name === r;
            }),
            c = a && a.data && a.data[n] ? a.data[n] : 0,
            o = (a && a.exhaustive) || !1;
          return {
            type: t,
            attributeName: r,
            name: n,
            count: c,
            exhaustive: o,
          };
        }
        (g.prototype.getFacetByName = function (e) {
          function t(t) {
            return t.name === e;
          }
          return (
            s(this.facets, t) ||
            s(this.disjunctiveFacets, t) ||
            s(this.hierarchicalFacets, t)
          );
        }),
          (g.DEFAULT_SORT = ["isRefined:desc", "count:desc", "name:asc"]),
          (g.prototype.getFacetValues = function (e, t) {
            var r = y(this, e);
            if (r) {
              var n = i({}, t, {
                  sortBy: g.DEFAULT_SORT,
                  facetOrdering: !(t && t.sortBy),
                }),
                c = this;
              return b(
                function (e, t) {
                  if (n.facetOrdering) {
                    var r = (function (e, t) {
                      return (
                        e.renderingContent &&
                        e.renderingContent.facetOrdering &&
                        e.renderingContent.facetOrdering.values &&
                        e.renderingContent.facetOrdering.values[t]
                      );
                    })(c, t);
                    if (Boolean(r))
                      return (function (e, t) {
                        var r = [],
                          n = [],
                          i = (t.order || []).reduce(function (e, t, r) {
                            return (e[t] = r), e;
                          }, {});
                        e.forEach(function (e) {
                          var t = e.path || e.name;
                          void 0 !== i[t] ? (r[i[t]] = e) : n.push(e);
                        }),
                          (r = r.filter(function (e) {
                            return e;
                          }));
                        var c,
                          s = t.sortRemainingBy;
                        return "hidden" === s
                          ? r
                          : ((c =
                              "alpha" === s
                                ? [
                                    ["path", "name"],
                                    ["asc", "asc"],
                                  ]
                                : [["count"], ["desc"]]),
                            r.concat(a(n, c[0], c[1])));
                      })(e, r);
                  }
                  if (Array.isArray(n.sortBy)) {
                    var i = u(n.sortBy, g.DEFAULT_SORT);
                    return a(e, i[0], i[1]);
                  }
                  if ("function" == typeof n.sortBy)
                    return (function (e, t) {
                      return t.sort(e);
                    })(n.sortBy, e);
                  throw new Error(
                    "options.sortBy is optional but if defined it must be either an array of string (predicates) or a sorting function"
                  );
                },
                r,
                Array.isArray(r)
                  ? [e]
                  : c._state.getHierarchicalFacetByName(r.name).attributes
              );
            }
          }),
          (g.prototype.getFacetStats = function (e) {
            return this._state.isConjunctiveFacet(e)
              ? v(this.facets, e)
              : this._state.isDisjunctiveFacet(e)
              ? v(this.disjunctiveFacets, e)
              : void 0;
          }),
          (g.prototype.getRefinements = function () {
            var e = this._state,
              t = this,
              r = [];
            return (
              Object.keys(e.facetsRefinements).forEach(function (n) {
                e.facetsRefinements[n].forEach(function (e) {
                  r.push(I(0, "facet", n, e, t.facets));
                });
              }),
              Object.keys(e.facetsExcludes).forEach(function (n) {
                e.facetsExcludes[n].forEach(function (e) {
                  r.push(I(0, "exclude", n, e, t.facets));
                });
              }),
              Object.keys(e.disjunctiveFacetsRefinements).forEach(function (n) {
                e.disjunctiveFacetsRefinements[n].forEach(function (e) {
                  r.push(I(0, "disjunctive", n, e, t.disjunctiveFacets));
                });
              }),
              Object.keys(e.hierarchicalFacetsRefinements).forEach(function (
                n
              ) {
                e.hierarchicalFacetsRefinements[n].forEach(function (i) {
                  r.push(
                    (function (e, t, r, n) {
                      var i = e.getHierarchicalFacetByName(t),
                        a = e._getHierarchicalFacetSeparator(i),
                        c = r.split(a),
                        o = s(n, function (e) {
                          return e.name === t;
                        }),
                        u = c.reduce(function (e, t) {
                          var r =
                            e &&
                            s(e.data, function (e) {
                              return e.name === t;
                            });
                          return void 0 !== r ? r : e;
                        }, o),
                        l = (u && u.count) || 0,
                        f = (u && u.exhaustive) || !1,
                        h = (u && u.path) || "";
                      return {
                        type: "hierarchical",
                        attributeName: t,
                        name: h,
                        count: l,
                        exhaustive: f,
                      };
                    })(e, n, i, t.hierarchicalFacets)
                  );
                });
              }),
              Object.keys(e.numericRefinements).forEach(function (t) {
                var n = e.numericRefinements[t];
                Object.keys(n).forEach(function (e) {
                  n[e].forEach(function (n) {
                    r.push({
                      type: "numeric",
                      attributeName: t,
                      name: n,
                      numericValue: n,
                      operator: e,
                    });
                  });
                });
              }),
              e.tagRefinements.forEach(function (e) {
                r.push({ type: "tag", attributeName: "_tags", name: e });
              }),
              r
            );
          }),
          (e.exports = g);
      },
      374: (e, t, r) => {
        "use strict";
        var n = r(775),
          i = r(76),
          a = r(78),
          c = r(394),
          s = r(331),
          o = r(853),
          u = r(116),
          l = r(803),
          f = r(185),
          h = r(336),
          d = r(39).escapeFacetValue;
        function p(e, t, r) {
          "function" == typeof e.addAlgoliaAgent &&
            e.addAlgoliaAgent("JS Helper (" + h + ")"),
            this.setClient(e);
          var i = r || {};
          (i.index = t),
            (this.state = n.make(i)),
            (this.lastResults = null),
            (this._queryId = 0),
            (this._lastQueryIdReceived = -1),
            (this.derivedHelpers = []),
            (this._currentNbQueries = 0);
        }
        function m(e) {
          if (e < 0) throw new Error("Page requested below 0.");
          return (
            this._change({ state: this.state.setPage(e), isPageReset: !1 }),
            this
          );
        }
        function g() {
          return this.state.page;
        }
        o(p, s),
          (p.prototype.search = function () {
            return this._search({ onlyWithDerivedHelpers: !1 }), this;
          }),
          (p.prototype.searchOnlyWithDerivedHelpers = function () {
            return this._search({ onlyWithDerivedHelpers: !0 }), this;
          }),
          (p.prototype.getQuery = function () {
            var e = this.state;
            return c._getHitsSearchParams(e);
          }),
          (p.prototype.searchOnce = function (e, t) {
            var r = e ? this.state.setQueryParameters(e) : this.state,
              n = c._getQueries(r.index, r),
              a = this;
            if (
              (this._currentNbQueries++,
              this.emit("searchOnce", { state: r }),
              !t)
            )
              return this.client.search(n).then(
                function (e) {
                  return (
                    a._currentNbQueries--,
                    0 === a._currentNbQueries && a.emit("searchQueueEmpty"),
                    {
                      content: new i(r, e.results),
                      state: r,
                      _originalResponse: e,
                    }
                  );
                },
                function (e) {
                  throw (
                    (a._currentNbQueries--,
                    0 === a._currentNbQueries && a.emit("searchQueueEmpty"),
                    e)
                  );
                }
              );
            this.client
              .search(n)
              .then(function (e) {
                a._currentNbQueries--,
                  0 === a._currentNbQueries && a.emit("searchQueueEmpty"),
                  t(null, new i(r, e.results), r);
              })
              .catch(function (e) {
                a._currentNbQueries--,
                  0 === a._currentNbQueries && a.emit("searchQueueEmpty"),
                  t(e, null, r);
              });
          }),
          (p.prototype.findAnswers = function (e) {
            console.warn(
              "[algoliasearch-helper] answers is no longer supported"
            );
            var t = this.state,
              r = this.derivedHelpers[0];
            if (!r) return Promise.resolve([]);
            var n = r.getModifiedState(t),
              i = f(
                {
                  attributesForPrediction: e.attributesForPrediction,
                  nbHits: e.nbHits,
                },
                {
                  params: l(c._getHitsSearchParams(n), [
                    "attributesToSnippet",
                    "hitsPerPage",
                    "restrictSearchableAttributes",
                    "snippetEllipsisText",
                  ]),
                }
              ),
              a =
                "search for answers was called, but this client does not have a function client.initIndex(index).findAnswers";
            if ("function" != typeof this.client.initIndex) throw new Error(a);
            var s = this.client.initIndex(n.index);
            if ("function" != typeof s.findAnswers) throw new Error(a);
            return s.findAnswers(n.query, e.queryLanguages, i);
          }),
          (p.prototype.searchForFacetValues = function (e, t, r, n) {
            var i = "function" == typeof this.client.searchForFacetValues,
              a = "function" == typeof this.client.initIndex;
            if (!i && !a && "function" != typeof this.client.search)
              throw new Error(
                "search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues"
              );
            var s = this.state.setQueryParameters(n || {}),
              o = s.isDisjunctiveFacet(e),
              u = c.getSearchForFacetQuery(e, t, r, s);
            this._currentNbQueries++;
            var l,
              f = this;
            return (
              i
                ? (l = this.client.searchForFacetValues([
                    { indexName: s.index, params: u },
                  ]))
                : a
                ? (l = this.client.initIndex(s.index).searchForFacetValues(u))
                : (delete u.facetName,
                  (l = this.client
                    .search([
                      {
                        type: "facet",
                        facet: e,
                        indexName: s.index,
                        params: u,
                      },
                    ])
                    .then(function (e) {
                      return e.results[0];
                    }))),
              this.emit("searchForFacetValues", {
                state: s,
                facet: e,
                query: t,
              }),
              l.then(
                function (t) {
                  return (
                    f._currentNbQueries--,
                    0 === f._currentNbQueries && f.emit("searchQueueEmpty"),
                    (t = Array.isArray(t) ? t[0] : t).facetHits.forEach(
                      function (t) {
                        (t.escapedValue = d(t.value)),
                          (t.isRefined = o
                            ? s.isDisjunctiveFacetRefined(e, t.escapedValue)
                            : s.isFacetRefined(e, t.escapedValue));
                      }
                    ),
                    t
                  );
                },
                function (e) {
                  throw (
                    (f._currentNbQueries--,
                    0 === f._currentNbQueries && f.emit("searchQueueEmpty"),
                    e)
                  );
                }
              )
            );
          }),
          (p.prototype.setQuery = function (e) {
            return (
              this._change({
                state: this.state.resetPage().setQuery(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.clearRefinements = function (e) {
            return (
              this._change({
                state: this.state.resetPage().clearRefinements(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.clearTags = function () {
            return (
              this._change({
                state: this.state.resetPage().clearTags(),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.addDisjunctiveFacetRefinement = function (e, t) {
            return (
              this._change({
                state: this.state
                  .resetPage()
                  .addDisjunctiveFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.addDisjunctiveRefine = function () {
            return this.addDisjunctiveFacetRefinement.apply(this, arguments);
          }),
          (p.prototype.addHierarchicalFacetRefinement = function (e, t) {
            return (
              this._change({
                state: this.state
                  .resetPage()
                  .addHierarchicalFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.addNumericRefinement = function (e, t, r) {
            return (
              this._change({
                state: this.state.resetPage().addNumericRefinement(e, t, r),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.addFacetRefinement = function (e, t) {
            return (
              this._change({
                state: this.state.resetPage().addFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.addRefine = function () {
            return this.addFacetRefinement.apply(this, arguments);
          }),
          (p.prototype.addFacetExclusion = function (e, t) {
            return (
              this._change({
                state: this.state.resetPage().addExcludeRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.addExclude = function () {
            return this.addFacetExclusion.apply(this, arguments);
          }),
          (p.prototype.addTag = function (e) {
            return (
              this._change({
                state: this.state.resetPage().addTagRefinement(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.removeNumericRefinement = function (e, t, r) {
            return (
              this._change({
                state: this.state.resetPage().removeNumericRefinement(e, t, r),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.removeDisjunctiveFacetRefinement = function (e, t) {
            return (
              this._change({
                state: this.state
                  .resetPage()
                  .removeDisjunctiveFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.removeDisjunctiveRefine = function () {
            return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
          }),
          (p.prototype.removeHierarchicalFacetRefinement = function (e) {
            return (
              this._change({
                state: this.state
                  .resetPage()
                  .removeHierarchicalFacetRefinement(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.removeFacetRefinement = function (e, t) {
            return (
              this._change({
                state: this.state.resetPage().removeFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.removeRefine = function () {
            return this.removeFacetRefinement.apply(this, arguments);
          }),
          (p.prototype.removeFacetExclusion = function (e, t) {
            return (
              this._change({
                state: this.state.resetPage().removeExcludeRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.removeExclude = function () {
            return this.removeFacetExclusion.apply(this, arguments);
          }),
          (p.prototype.removeTag = function (e) {
            return (
              this._change({
                state: this.state.resetPage().removeTagRefinement(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.toggleFacetExclusion = function (e, t) {
            return (
              this._change({
                state: this.state
                  .resetPage()
                  .toggleExcludeFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.toggleExclude = function () {
            return this.toggleFacetExclusion.apply(this, arguments);
          }),
          (p.prototype.toggleRefinement = function (e, t) {
            return this.toggleFacetRefinement(e, t);
          }),
          (p.prototype.toggleFacetRefinement = function (e, t) {
            return (
              this._change({
                state: this.state.resetPage().toggleFacetRefinement(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.toggleRefine = function () {
            return this.toggleFacetRefinement.apply(this, arguments);
          }),
          (p.prototype.toggleTag = function (e) {
            return (
              this._change({
                state: this.state.resetPage().toggleTagRefinement(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.nextPage = function () {
            var e = this.state.page || 0;
            return this.setPage(e + 1);
          }),
          (p.prototype.previousPage = function () {
            var e = this.state.page || 0;
            return this.setPage(e - 1);
          }),
          (p.prototype.setCurrentPage = m),
          (p.prototype.setPage = m),
          (p.prototype.setIndex = function (e) {
            return (
              this._change({
                state: this.state.resetPage().setIndex(e),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.setQueryParameter = function (e, t) {
            return (
              this._change({
                state: this.state.resetPage().setQueryParameter(e, t),
                isPageReset: !0,
              }),
              this
            );
          }),
          (p.prototype.setState = function (e) {
            return this._change({ state: n.make(e), isPageReset: !1 }), this;
          }),
          (p.prototype.overrideStateWithoutTriggeringChangeEvent = function (
            e
          ) {
            return (this.state = new n(e)), this;
          }),
          (p.prototype.hasRefinements = function (e) {
            return (
              !!u(this.state.getNumericRefinements(e)) ||
              (this.state.isConjunctiveFacet(e)
                ? this.state.isFacetRefined(e)
                : this.state.isDisjunctiveFacet(e)
                ? this.state.isDisjunctiveFacetRefined(e)
                : !!this.state.isHierarchicalFacet(e) &&
                  this.state.isHierarchicalFacetRefined(e))
            );
          }),
          (p.prototype.isExcluded = function (e, t) {
            return this.state.isExcludeRefined(e, t);
          }),
          (p.prototype.isDisjunctiveRefined = function (e, t) {
            return this.state.isDisjunctiveFacetRefined(e, t);
          }),
          (p.prototype.hasTag = function (e) {
            return this.state.isTagRefined(e);
          }),
          (p.prototype.isTagRefined = function () {
            return this.hasTagRefinements.apply(this, arguments);
          }),
          (p.prototype.getIndex = function () {
            return this.state.index;
          }),
          (p.prototype.getCurrentPage = g),
          (p.prototype.getPage = g),
          (p.prototype.getTags = function () {
            return this.state.tagRefinements;
          }),
          (p.prototype.getRefinements = function (e) {
            var t = [];
            this.state.isConjunctiveFacet(e)
              ? (this.state.getConjunctiveRefinements(e).forEach(function (e) {
                  t.push({ value: e, type: "conjunctive" });
                }),
                this.state.getExcludeRefinements(e).forEach(function (e) {
                  t.push({ value: e, type: "exclude" });
                }))
              : this.state.isDisjunctiveFacet(e) &&
                this.state.getDisjunctiveRefinements(e).forEach(function (e) {
                  t.push({ value: e, type: "disjunctive" });
                });
            var r = this.state.getNumericRefinements(e);
            return (
              Object.keys(r).forEach(function (e) {
                var n = r[e];
                t.push({ value: n, operator: e, type: "numeric" });
              }),
              t
            );
          }),
          (p.prototype.getNumericRefinement = function (e, t) {
            return this.state.getNumericRefinement(e, t);
          }),
          (p.prototype.getHierarchicalFacetBreadcrumb = function (e) {
            return this.state.getHierarchicalFacetBreadcrumb(e);
          }),
          (p.prototype._search = function (e) {
            var t = this.state,
              r = [],
              n = [];
            e.onlyWithDerivedHelpers ||
              ((n = c._getQueries(t.index, t)),
              r.push({ state: t, queriesCount: n.length, helper: this }),
              this.emit("search", { state: t, results: this.lastResults }));
            var i = this.derivedHelpers.map(function (e) {
                var n = e.getModifiedState(t),
                  i = c._getQueries(n.index, n);
                return (
                  r.push({ state: n, queriesCount: i.length, helper: e }),
                  e.emit("search", { state: n, results: e.lastResults }),
                  i
                );
              }),
              a = Array.prototype.concat.apply(n, i),
              s = this._queryId++;
            this._currentNbQueries++;
            try {
              this.client
                .search(a)
                .then(this._dispatchAlgoliaResponse.bind(this, r, s))
                .catch(this._dispatchAlgoliaError.bind(this, s));
            } catch (e) {
              this.emit("error", { error: e });
            }
          }),
          (p.prototype._dispatchAlgoliaResponse = function (e, t, r) {
            if (!(t < this._lastQueryIdReceived)) {
              (this._currentNbQueries -= t - this._lastQueryIdReceived),
                (this._lastQueryIdReceived = t),
                0 === this._currentNbQueries && this.emit("searchQueueEmpty");
              var n = r.results.slice();
              e.forEach(function (e) {
                var t = e.state,
                  r = e.queriesCount,
                  a = e.helper,
                  c = n.splice(0, r),
                  s = (a.lastResults = new i(t, c));
                a.emit("result", { results: s, state: t });
              });
            }
          }),
          (p.prototype._dispatchAlgoliaError = function (e, t) {
            e < this._lastQueryIdReceived ||
              ((this._currentNbQueries -= e - this._lastQueryIdReceived),
              (this._lastQueryIdReceived = e),
              this.emit("error", { error: t }),
              0 === this._currentNbQueries && this.emit("searchQueueEmpty"));
          }),
          (p.prototype.containsRefinement = function (e, t, r, n) {
            return e || 0 !== t.length || 0 !== r.length || 0 !== n.length;
          }),
          (p.prototype._hasDisjunctiveRefinements = function (e) {
            return (
              this.state.disjunctiveRefinements[e] &&
              this.state.disjunctiveRefinements[e].length > 0
            );
          }),
          (p.prototype._change = function (e) {
            var t = e.state,
              r = e.isPageReset;
            t !== this.state &&
              ((this.state = t),
              this.emit("change", {
                state: this.state,
                results: this.lastResults,
                isPageReset: r,
              }));
          }),
          (p.prototype.clearCache = function () {
            return this.client.clearCache && this.client.clearCache(), this;
          }),
          (p.prototype.setClient = function (e) {
            return (
              this.client === e ||
                ("function" == typeof e.addAlgoliaAgent &&
                  e.addAlgoliaAgent("JS Helper (" + h + ")"),
                (this.client = e)),
              this
            );
          }),
          (p.prototype.getClient = function () {
            return this.client;
          }),
          (p.prototype.derive = function (e) {
            var t = new a(this, e);
            return this.derivedHelpers.push(t), t;
          }),
          (p.prototype.detachDerivedHelper = function (e) {
            var t = this.derivedHelpers.indexOf(e);
            if (-1 === t) throw new Error("Derived helper already detached");
            this.derivedHelpers.splice(t, 1);
          }),
          (p.prototype.hasPendingRequests = function () {
            return this._currentNbQueries > 0;
          }),
          (e.exports = p);
      },
      587: (e) => {
        "use strict";
        e.exports = function (e) {
          return Array.isArray(e) ? e.filter(Boolean) : [];
        };
      },
      344: (e) => {
        "use strict";
        e.exports = function () {
          var e = Array.prototype.slice.call(arguments);
          return e.reduceRight(function (e, t) {
            return (
              Object.keys(Object(t)).forEach(function (r) {
                void 0 !== t[r] &&
                  (void 0 !== e[r] && delete e[r], (e[r] = t[r]));
              }),
              e
            );
          }, {});
        };
      },
      39: (e) => {
        "use strict";
        e.exports = {
          escapeFacetValue: function (e) {
            return "string" != typeof e ? e : String(e).replace(/^-/, "\\-");
          },
          unescapeFacetValue: function (e) {
            return "string" != typeof e ? e : e.replace(/^\\-/, "-");
          },
        };
      },
      888: (e) => {
        "use strict";
        e.exports = function (e, t) {
          if (Array.isArray(e))
            for (var r = 0; r < e.length; r++) if (t(e[r])) return e[r];
        };
      },
      725: (e) => {
        "use strict";
        e.exports = function (e, t) {
          if (!Array.isArray(e)) return -1;
          for (var r = 0; r < e.length; r++) if (t(e[r])) return r;
          return -1;
        };
      },
      293: (e, t, r) => {
        "use strict";
        var n = r(888);
        e.exports = function (e, t) {
          var r = (t || []).map(function (e) {
            return e.split(":");
          });
          return e.reduce(
            function (e, t) {
              var i = t.split(":"),
                a = n(r, function (e) {
                  return e[0] === i[0];
                });
              return i.length > 1 || !a
                ? (e[0].push(i[0]), e[1].push(i[1]), e)
                : (e[0].push(a[0]), e[1].push(a[1]), e);
            },
            [[], []]
          );
        };
      },
      853: (e) => {
        "use strict";
        e.exports = function (e, t) {
          e.prototype = Object.create(t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          });
        };
      },
      686: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return e.filter(function (r, n) {
            return t.indexOf(r) > -1 && e.indexOf(r) === n;
          });
        };
      },
      185: (e) => {
        "use strict";
        function t(e) {
          return (
            "function" == typeof e ||
            Array.isArray(e) ||
            "[object Object]" === Object.prototype.toString.call(e)
          );
        }
        function r(e, n) {
          if (e === n) return e;
          for (var i in n)
            if (
              Object.prototype.hasOwnProperty.call(n, i) &&
              "__proto__" !== i &&
              "constructor" !== i
            ) {
              var a = n[i],
                c = e[i];
              (void 0 !== c && void 0 === a) ||
                (t(c) && t(a)
                  ? (e[i] = r(c, a))
                  : (e[i] =
                      "object" == typeof (s = a) && null !== s
                        ? r(Array.isArray(s) ? [] : {}, s)
                        : s));
            }
          var s;
          return e;
        }
        e.exports = function (e) {
          t(e) || (e = {});
          for (var n = 1, i = arguments.length; n < i; n++) {
            var a = arguments[n];
            t(a) && r(e, a);
          }
          return e;
        };
      },
      116: (e) => {
        "use strict";
        e.exports = function (e) {
          return e && Object.keys(e).length > 0;
        };
      },
      803: (e) => {
        "use strict";
        e.exports = function (e, t) {
          if (null === e) return {};
          var r,
            n,
            i = {},
            a = Object.keys(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
          return i;
        };
      },
      148: (e) => {
        "use strict";
        function t(e, t) {
          if (e !== t) {
            var r = void 0 !== e,
              n = null === e,
              i = void 0 !== t,
              a = null === t;
            if ((!a && e > t) || (n && i) || !r) return 1;
            if ((!n && e < t) || (a && r) || !i) return -1;
          }
          return 0;
        }
        e.exports = function (e, r, n) {
          if (!Array.isArray(e)) return [];
          Array.isArray(n) || (n = []);
          var i = e.map(function (e, t) {
            return {
              criteria: r.map(function (t) {
                return e[t];
              }),
              index: t,
              value: e,
            };
          });
          return (
            i.sort(function (e, r) {
              for (var i = -1; ++i < e.criteria.length; ) {
                var a = t(e.criteria[i], r.criteria[i]);
                if (a) return i >= n.length ? a : "desc" === n[i] ? -a : a;
              }
              return e.index - r.index;
            }),
            i.map(function (e) {
              return e.value;
            })
          );
        };
      },
      23: (e) => {
        "use strict";
        e.exports = function e(t) {
          if ("number" == typeof t) return t;
          if ("string" == typeof t) return parseFloat(t);
          if (Array.isArray(t)) return t.map(e);
          throw new Error(
            "The value should be a number, a parsable string or an array of those."
          );
        };
      },
      394: (e, t, r) => {
        "use strict";
        var n = r(185);
        function i(e) {
          return Object.keys(e)
            .sort(function (e, t) {
              return e.localeCompare(t);
            })
            .reduce(function (t, r) {
              return (t[r] = e[r]), t;
            }, {});
        }
        var a = {
          _getQueries: function (e, t) {
            var r = [];
            return (
              r.push({ indexName: e, params: a._getHitsSearchParams(t) }),
              t.getRefinedDisjunctiveFacets().forEach(function (n) {
                r.push({
                  indexName: e,
                  params: a._getDisjunctiveFacetSearchParams(t, n),
                });
              }),
              t.getRefinedHierarchicalFacets().forEach(function (n) {
                var i = t.getHierarchicalFacetByName(n),
                  c = t.getHierarchicalRefinement(n),
                  s = t._getHierarchicalFacetSeparator(i);
                if (c.length > 0 && c[0].split(s).length > 1) {
                  var o = c[0]
                    .split(s)
                    .slice(0, -1)
                    .reduce(function (e, t, r) {
                      return e.concat({
                        attribute: i.attributes[r],
                        value: 0 === r ? t : [e[e.length - 1].value, t].join(s),
                      });
                    }, []);
                  o.forEach(function (n, c) {
                    var s = a._getDisjunctiveFacetSearchParams(
                      t,
                      n.attribute,
                      0 === c
                    );
                    function u(e) {
                      return i.attributes.some(function (t) {
                        return t === e.split(":")[0];
                      });
                    }
                    var l = (s.facetFilters || []).reduce(function (e, t) {
                        if (Array.isArray(t)) {
                          var r = t.filter(function (e) {
                            return !u(e);
                          });
                          r.length > 0 && e.push(r);
                        }
                        return "string" != typeof t || u(t) || e.push(t), e;
                      }, []),
                      f = o[c - 1];
                    (s.facetFilters =
                      c > 0
                        ? l.concat(f.attribute + ":" + f.value)
                        : l.length > 0
                        ? l
                        : void 0),
                      r.push({ indexName: e, params: s });
                  });
                }
              }),
              r
            );
          },
          _getHitsSearchParams: function (e) {
            var t = e.facets
                .concat(e.disjunctiveFacets)
                .concat(a._getHitsHierarchicalFacetsAttributes(e)),
              r = a._getFacetFilters(e),
              c = a._getNumericFilters(e),
              s = a._getTagFilters(e),
              o = { facets: t.indexOf("*") > -1 ? ["*"] : t, tagFilters: s };
            return (
              r.length > 0 && (o.facetFilters = r),
              c.length > 0 && (o.numericFilters = c),
              i(n({}, e.getQueryParams(), o))
            );
          },
          _getDisjunctiveFacetSearchParams: function (e, t, r) {
            var c = a._getFacetFilters(e, t, r),
              s = a._getNumericFilters(e, t),
              o = a._getTagFilters(e),
              u = {
                hitsPerPage: 0,
                page: 0,
                analytics: !1,
                clickAnalytics: !1,
              };
            o.length > 0 && (u.tagFilters = o);
            var l = e.getHierarchicalFacetByName(t);
            return (
              (u.facets = l
                ? a._getDisjunctiveHierarchicalFacetAttribute(e, l, r)
                : t),
              s.length > 0 && (u.numericFilters = s),
              c.length > 0 && (u.facetFilters = c),
              i(n({}, e.getQueryParams(), u))
            );
          },
          _getNumericFilters: function (e, t) {
            if (e.numericFilters) return e.numericFilters;
            var r = [];
            return (
              Object.keys(e.numericRefinements).forEach(function (n) {
                var i = e.numericRefinements[n] || {};
                Object.keys(i).forEach(function (e) {
                  var a = i[e] || [];
                  t !== n &&
                    a.forEach(function (t) {
                      if (Array.isArray(t)) {
                        var i = t.map(function (t) {
                          return n + e + t;
                        });
                        r.push(i);
                      } else r.push(n + e + t);
                    });
                });
              }),
              r
            );
          },
          _getTagFilters: function (e) {
            return e.tagFilters ? e.tagFilters : e.tagRefinements.join(",");
          },
          _getFacetFilters: function (e, t, r) {
            var n = [],
              i = e.facetsRefinements || {};
            Object.keys(i).forEach(function (e) {
              (i[e] || []).forEach(function (t) {
                n.push(e + ":" + t);
              });
            });
            var a = e.facetsExcludes || {};
            Object.keys(a).forEach(function (e) {
              (a[e] || []).forEach(function (t) {
                n.push(e + ":-" + t);
              });
            });
            var c = e.disjunctiveFacetsRefinements || {};
            Object.keys(c).forEach(function (e) {
              var r = c[e] || [];
              if (e !== t && r && 0 !== r.length) {
                var i = [];
                r.forEach(function (t) {
                  i.push(e + ":" + t);
                }),
                  n.push(i);
              }
            });
            var s = e.hierarchicalFacetsRefinements || {};
            return (
              Object.keys(s).forEach(function (i) {
                var a = (s[i] || [])[0];
                if (void 0 !== a) {
                  var c,
                    o,
                    u = e.getHierarchicalFacetByName(i),
                    l = e._getHierarchicalFacetSeparator(u),
                    f = e._getHierarchicalRootPath(u);
                  if (t === i) {
                    if (
                      -1 === a.indexOf(l) ||
                      (!f && !0 === r) ||
                      (f && f.split(l).length === a.split(l).length)
                    )
                      return;
                    f
                      ? ((o = f.split(l).length - 1), (a = f))
                      : ((o = a.split(l).length - 2),
                        (a = a.slice(0, a.lastIndexOf(l)))),
                      (c = u.attributes[o]);
                  } else (o = a.split(l).length - 1), (c = u.attributes[o]);
                  c && n.push([c + ":" + a]);
                }
              }),
              n
            );
          },
          _getHitsHierarchicalFacetsAttributes: function (e) {
            return e.hierarchicalFacets.reduce(function (t, r) {
              var n = e.getHierarchicalRefinement(r.name)[0];
              if (!n) return t.push(r.attributes[0]), t;
              var i = e._getHierarchicalFacetSeparator(r),
                a = n.split(i).length,
                c = r.attributes.slice(0, a + 1);
              return t.concat(c);
            }, []);
          },
          _getDisjunctiveHierarchicalFacetAttribute: function (e, t, r) {
            var n = e._getHierarchicalFacetSeparator(t);
            if (!0 === r) {
              var i = e._getHierarchicalRootPath(t),
                a = 0;
              return i && (a = i.split(n).length), [t.attributes[a]];
            }
            var c =
              (e.getHierarchicalRefinement(t.name)[0] || "").split(n).length -
              1;
            return t.attributes.slice(0, c + 1);
          },
          getSearchForFacetQuery: function (e, t, r, c) {
            var s = c.isDisjunctiveFacet(e) ? c.clearRefinements(e) : c,
              o = { facetQuery: t, facetName: e };
            return (
              "number" == typeof r && (o.maxFacetHits = r),
              i(n({}, a._getHitsSearchParams(s), o))
            );
          },
        };
        e.exports = a;
      },
      801: (e) => {
        "use strict";
        e.exports = function (e) {
          return null !== e && /^[a-zA-Z0-9_-]{1,64}$/.test(e);
        };
      },
      336: (e) => {
        "use strict";
        e.exports = "3.12.0";
      },
      955: function (e) {
        e.exports = (function () {
          "use strict";
          function e(e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          }
          function t(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var n = Object.getOwnPropertySymbols(e);
              t &&
                (n = n.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                r.push.apply(r, n);
            }
            return r;
          }
          function r(r) {
            for (var n = 1; n < arguments.length; n++) {
              var i = null != arguments[n] ? arguments[n] : {};
              n % 2
                ? t(Object(i), !0).forEach(function (t) {
                    e(r, t, i[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    r,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : t(Object(i)).forEach(function (e) {
                    Object.defineProperty(
                      r,
                      e,
                      Object.getOwnPropertyDescriptor(i, e)
                    );
                  });
            }
            return r;
          }
          function n(e, t) {
            if (null == e) return {};
            var r,
              n,
              i = (function (e, t) {
                if (null == e) return {};
                var r,
                  n,
                  i = {},
                  a = Object.keys(e);
                for (n = 0; n < a.length; n++)
                  (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
                return i;
              })(e, t);
            if (Object.getOwnPropertySymbols) {
              var a = Object.getOwnPropertySymbols(e);
              for (n = 0; n < a.length; n++)
                (r = a[n]),
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(e, r) &&
                      (i[r] = e[r]));
            }
            return i;
          }
          function i(e, t) {
            return (
              (function (e) {
                if (Array.isArray(e)) return e;
              })(e) ||
              (function (e, t) {
                if (
                  Symbol.iterator in Object(e) ||
                  "[object Arguments]" === Object.prototype.toString.call(e)
                ) {
                  var r = [],
                    n = !0,
                    i = !1,
                    a = void 0;
                  try {
                    for (
                      var c, s = e[Symbol.iterator]();
                      !(n = (c = s.next()).done) &&
                      (r.push(c.value), !t || r.length !== t);
                      n = !0
                    );
                  } catch (e) {
                    (i = !0), (a = e);
                  } finally {
                    try {
                      n || null == s.return || s.return();
                    } finally {
                      if (i) throw a;
                    }
                  }
                  return r;
                }
              })(e, t) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance"
                );
              })()
            );
          }
          function a(e) {
            return (
              (function (e) {
                if (Array.isArray(e)) {
                  for (var t = 0, r = new Array(e.length); t < e.length; t++)
                    r[t] = e[t];
                  return r;
                }
              })(e) ||
              (function (e) {
                if (
                  Symbol.iterator in Object(e) ||
                  "[object Arguments]" === Object.prototype.toString.call(e)
                )
                  return Array.from(e);
              })(e) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to spread non-iterable instance"
                );
              })()
            );
          }
          function c(e) {
            var t,
              r = "algoliasearch-client-js-".concat(e.key),
              n = function () {
                return (
                  void 0 === t && (t = e.localStorage || window.localStorage), t
                );
              },
              a = function () {
                return JSON.parse(n().getItem(r) || "{}");
              };
            return {
              get: function (e, t) {
                var r =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {
                        miss: function () {
                          return Promise.resolve();
                        },
                      };
                return Promise.resolve()
                  .then(function () {
                    var r = JSON.stringify(e),
                      n = a()[r];
                    return Promise.all([n || t(), void 0 !== n]);
                  })
                  .then(function (e) {
                    var t = i(e, 2),
                      n = t[0],
                      a = t[1];
                    return Promise.all([n, a || r.miss(n)]);
                  })
                  .then(function (e) {
                    return i(e, 1)[0];
                  });
              },
              set: function (e, t) {
                return Promise.resolve().then(function () {
                  var i = a();
                  return (
                    (i[JSON.stringify(e)] = t),
                    n().setItem(r, JSON.stringify(i)),
                    t
                  );
                });
              },
              delete: function (e) {
                return Promise.resolve().then(function () {
                  var t = a();
                  delete t[JSON.stringify(e)],
                    n().setItem(r, JSON.stringify(t));
                });
              },
              clear: function () {
                return Promise.resolve().then(function () {
                  n().removeItem(r);
                });
              },
            };
          }
          function s(e) {
            var t = a(e.caches),
              r = t.shift();
            return void 0 === r
              ? {
                  get: function (e, t) {
                    var r =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {
                            miss: function () {
                              return Promise.resolve();
                            },
                          };
                    return t()
                      .then(function (e) {
                        return Promise.all([e, r.miss(e)]);
                      })
                      .then(function (e) {
                        return i(e, 1)[0];
                      });
                  },
                  set: function (e, t) {
                    return Promise.resolve(t);
                  },
                  delete: function (e) {
                    return Promise.resolve();
                  },
                  clear: function () {
                    return Promise.resolve();
                  },
                }
              : {
                  get: function (e, n) {
                    var i =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {
                            miss: function () {
                              return Promise.resolve();
                            },
                          };
                    return r.get(e, n, i).catch(function () {
                      return s({ caches: t }).get(e, n, i);
                    });
                  },
                  set: function (e, n) {
                    return r.set(e, n).catch(function () {
                      return s({ caches: t }).set(e, n);
                    });
                  },
                  delete: function (e) {
                    return r.delete(e).catch(function () {
                      return s({ caches: t }).delete(e);
                    });
                  },
                  clear: function () {
                    return r.clear().catch(function () {
                      return s({ caches: t }).clear();
                    });
                  },
                };
          }
          function o() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { serializable: !0 },
              t = {};
            return {
              get: function (r, n) {
                var i =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {
                          miss: function () {
                            return Promise.resolve();
                          },
                        },
                  a = JSON.stringify(r);
                if (a in t)
                  return Promise.resolve(
                    e.serializable ? JSON.parse(t[a]) : t[a]
                  );
                var c = n(),
                  s =
                    (i && i.miss) ||
                    function () {
                      return Promise.resolve();
                    };
                return c
                  .then(function (e) {
                    return s(e);
                  })
                  .then(function () {
                    return c;
                  });
              },
              set: function (r, n) {
                return (
                  (t[JSON.stringify(r)] = e.serializable
                    ? JSON.stringify(n)
                    : n),
                  Promise.resolve(n)
                );
              },
              delete: function (e) {
                return delete t[JSON.stringify(e)], Promise.resolve();
              },
              clear: function () {
                return (t = {}), Promise.resolve();
              },
            };
          }
          function u(e, t, r) {
            var n = { "x-algolia-api-key": r, "x-algolia-application-id": t };
            return {
              headers: function () {
                return e === m.WithinHeaders ? n : {};
              },
              queryParameters: function () {
                return e === m.WithinQueryParameters ? n : {};
              },
            };
          }
          function l(e) {
            var t = 0;
            return e(function r() {
              return (
                t++,
                new Promise(function (n) {
                  setTimeout(function () {
                    n(e(r));
                  }, Math.min(100 * t, 1e3));
                })
              );
            });
          }
          function f(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function (e, t) {
                    return Promise.resolve();
                  };
            return Object.assign(e, {
              wait: function (r) {
                return f(
                  e
                    .then(function (e) {
                      return Promise.all([t(e, r), e]);
                    })
                    .then(function (e) {
                      return e[1];
                    })
                );
              },
            });
          }
          function h(e) {
            for (var t = e.length - 1; t > 0; t--) {
              var r = Math.floor(Math.random() * (t + 1)),
                n = e[t];
              (e[t] = e[r]), (e[r] = n);
            }
            return e;
          }
          function d(e, t) {
            return t
              ? (Object.keys(t).forEach(function (r) {
                  e[r] = t[r](e);
                }),
                e)
              : e;
          }
          function p(e) {
            for (
              var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
              n < t;
              n++
            )
              r[n - 1] = arguments[n];
            var i = 0;
            return e.replace(/%s/g, function () {
              return encodeURIComponent(r[i++]);
            });
          }
          var m = { WithinQueryParameters: 0, WithinHeaders: 1 };
          function g(e, t) {
            var r = e || {},
              n = r.data || {};
            return (
              Object.keys(r).forEach(function (e) {
                -1 ===
                  [
                    "timeout",
                    "headers",
                    "queryParameters",
                    "data",
                    "cacheable",
                  ].indexOf(e) && (n[e] = r[e]);
              }),
              {
                data: Object.entries(n).length > 0 ? n : void 0,
                timeout: r.timeout || t,
                headers: r.headers || {},
                queryParameters: r.queryParameters || {},
                cacheable: r.cacheable,
              }
            );
          }
          var y = { Read: 1, Write: 2, Any: 3 };
          function A(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 1;
            return r(r({}, e), {}, { status: t, lastUpdate: Date.now() });
          }
          function b(e) {
            return "string" == typeof e
              ? { protocol: "https", url: e, accept: y.Any }
              : {
                  protocol: e.protocol || "https",
                  url: e.url,
                  accept: e.accept || y.Any,
                };
          }
          var v = "DELETE",
            I = "GET",
            S = "POST",
            w = "PUT";
          function R(e, t, n, i) {
            var c = [],
              s = (function (e, t) {
                if (
                  e.method !== I &&
                  (void 0 !== e.data || void 0 !== t.data)
                ) {
                  var n = Array.isArray(e.data)
                    ? e.data
                    : r(r({}, e.data), t.data);
                  return JSON.stringify(n);
                }
              })(n, i),
              o = (function (e, t) {
                var n = r(r({}, e.headers), t.headers),
                  i = {};
                return (
                  Object.keys(n).forEach(function (e) {
                    var t = n[e];
                    i[e.toLowerCase()] = t;
                  }),
                  i
                );
              })(e, i),
              u = n.method,
              l = n.method !== I ? {} : r(r({}, n.data), i.data),
              f = r(
                r(
                  r(
                    { "x-algolia-agent": e.userAgent.value },
                    e.queryParameters
                  ),
                  l
                ),
                i.queryParameters
              ),
              h = 0,
              d = function t(r, a) {
                var l = r.pop();
                if (void 0 === l)
                  throw {
                    name: "RetryError",
                    message:
                      "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",
                    transporterStackTrace: T(c),
                  };
                var d = {
                    data: s,
                    headers: o,
                    method: u,
                    url: O(l, n.path, f),
                    connectTimeout: a(h, e.timeouts.connect),
                    responseTimeout: a(h, i.timeout),
                  },
                  p = function (e) {
                    var t = {
                      request: d,
                      response: e,
                      host: l,
                      triesLeft: r.length,
                    };
                    return c.push(t), t;
                  },
                  m = {
                    onSuccess: function (e) {
                      return (function (e) {
                        try {
                          return JSON.parse(e.content);
                        } catch (t) {
                          throw (function (e, t) {
                            return {
                              name: "DeserializationError",
                              message: e,
                              response: t,
                            };
                          })(t.message, e);
                        }
                      })(e);
                    },
                    onRetry: function (n) {
                      var i = p(n);
                      return (
                        n.isTimedOut && h++,
                        Promise.all([
                          e.logger.info("Retryable failure", H(i)),
                          e.hostsCache.set(l, A(l, n.isTimedOut ? 3 : 2)),
                        ]).then(function () {
                          return t(r, a);
                        })
                      );
                    },
                    onFail: function (e) {
                      throw (
                        (p(e),
                        (function (e, t) {
                          var r = e.content,
                            n = e.status,
                            i = r;
                          try {
                            i = JSON.parse(r).message;
                          } catch (e) {}
                          return (function (e, t, r) {
                            return {
                              name: "ApiError",
                              message: e,
                              status: t,
                              transporterStackTrace: r,
                            };
                          })(i, n, t);
                        })(e, T(c)))
                      );
                    },
                  };
                return e.requester.send(d).then(function (e) {
                  return (function (e, t) {
                    return (function (e) {
                      var t = e.status;
                      return (
                        e.isTimedOut ||
                        (function (e) {
                          var t = e.isTimedOut,
                            r = e.status;
                          return !t && 0 == ~~r;
                        })(e) ||
                        (2 != ~~(t / 100) && 4 != ~~(t / 100))
                      );
                    })(e)
                      ? t.onRetry(e)
                      : 2 == ~~(e.status / 100)
                      ? t.onSuccess(e)
                      : t.onFail(e);
                  })(e, m);
                });
              };
            return (function (e, t) {
              return Promise.all(
                t.map(function (t) {
                  return e.get(t, function () {
                    return Promise.resolve(A(t));
                  });
                })
              ).then(function (e) {
                var r = e.filter(function (e) {
                    return (function (e) {
                      return 1 === e.status || Date.now() - e.lastUpdate > 12e4;
                    })(e);
                  }),
                  n = e.filter(function (e) {
                    return (function (e) {
                      return (
                        3 === e.status && Date.now() - e.lastUpdate <= 12e4
                      );
                    })(e);
                  }),
                  i = [].concat(a(r), a(n));
                return {
                  getTimeout: function (e, t) {
                    return (
                      (0 === n.length && 0 === e ? 1 : n.length + 3 + e) * t
                    );
                  },
                  statelessHosts:
                    i.length > 0
                      ? i.map(function (e) {
                          return b(e);
                        })
                      : t,
                };
              });
            })(e.hostsCache, t).then(function (e) {
              return d(a(e.statelessHosts).reverse(), e.getTimeout);
            });
          }
          function j(e) {
            var t = e.hostsCache,
              r = e.logger,
              n = e.requester,
              a = e.requestsCache,
              c = e.responsesCache,
              s = e.timeouts,
              o = e.userAgent,
              u = e.hosts,
              l = e.queryParameters,
              f = {
                hostsCache: t,
                logger: r,
                requester: n,
                requestsCache: a,
                responsesCache: c,
                timeouts: s,
                userAgent: o,
                headers: e.headers,
                queryParameters: l,
                hosts: u.map(function (e) {
                  return b(e);
                }),
                read: function (e, t) {
                  var r = g(t, f.timeouts.read),
                    n = function () {
                      return R(
                        f,
                        f.hosts.filter(function (e) {
                          return 0 != (e.accept & y.Read);
                        }),
                        e,
                        r
                      );
                    };
                  if (
                    !0 !== (void 0 !== r.cacheable ? r.cacheable : e.cacheable)
                  )
                    return n();
                  var a = {
                    request: e,
                    mappedRequestOptions: r,
                    transporter: {
                      queryParameters: f.queryParameters,
                      headers: f.headers,
                    },
                  };
                  return f.responsesCache.get(
                    a,
                    function () {
                      return f.requestsCache.get(a, function () {
                        return f.requestsCache
                          .set(a, n())
                          .then(
                            function (e) {
                              return Promise.all([
                                f.requestsCache.delete(a),
                                e,
                              ]);
                            },
                            function (e) {
                              return Promise.all([
                                f.requestsCache.delete(a),
                                Promise.reject(e),
                              ]);
                            }
                          )
                          .then(function (e) {
                            var t = i(e, 2);
                            return t[0], t[1];
                          });
                      });
                    },
                    {
                      miss: function (e) {
                        return f.responsesCache.set(a, e);
                      },
                    }
                  );
                },
                write: function (e, t) {
                  return R(
                    f,
                    f.hosts.filter(function (e) {
                      return 0 != (e.accept & y.Write);
                    }),
                    e,
                    g(t, f.timeouts.write)
                  );
                },
              };
            return f;
          }
          function P(e) {
            var t = {
              value: "Algolia for JavaScript (".concat(e, ")"),
              add: function (e) {
                var r = "; "
                  .concat(e.segment)
                  .concat(
                    void 0 !== e.version ? " (".concat(e.version, ")") : ""
                  );
                return (
                  -1 === t.value.indexOf(r) &&
                    (t.value = "".concat(t.value).concat(r)),
                  t
                );
              },
            };
            return t;
          }
          function O(e, t, r) {
            var n = E(r),
              i = ""
                .concat(e.protocol, "://")
                .concat(e.url, "/")
                .concat("/" === t.charAt(0) ? t.substr(1) : t);
            return n.length && (i += "?".concat(n)), i;
          }
          function E(e) {
            return Object.keys(e)
              .map(function (t) {
                return p(
                  "%s=%s",
                  t,
                  ((r = e[t]),
                  "[object Object]" === Object.prototype.toString.call(r) ||
                  "[object Array]" === Object.prototype.toString.call(r)
                    ? JSON.stringify(e[t])
                    : e[t])
                );
                var r;
              })
              .join("&");
          }
          function T(e) {
            return e.map(function (e) {
              return H(e);
            });
          }
          function H(e) {
            var t = e.request.headers["x-algolia-api-key"]
              ? { "x-algolia-api-key": "*****" }
              : {};
            return r(
              r({}, e),
              {},
              {
                request: r(
                  r({}, e.request),
                  {},
                  { headers: r(r({}, e.request.headers), t) }
                ),
              }
            );
          }
          var k = function (e) {
              return function (t, r) {
                return e.transporter.write(
                  { method: S, path: "2/abtests", data: t },
                  r
                );
              };
            },
            x = function (e) {
              return function (t, r) {
                return e.transporter.write(
                  { method: v, path: p("2/abtests/%s", t) },
                  r
                );
              };
            },
            M = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  { method: I, path: p("2/abtests/%s", t) },
                  r
                );
              };
            },
            D = function (e) {
              return function (t) {
                return e.transporter.read({ method: I, path: "2/abtests" }, t);
              };
            },
            Z = function (e) {
              return function (t, r) {
                return e.transporter.write(
                  { method: S, path: p("2/abtests/%s/stop", t) },
                  r
                );
              };
            },
            U = function (e) {
              return function (t) {
                return e.transporter.read(
                  { method: I, path: "1/strategies/personalization" },
                  t
                );
              };
            },
            B = function (e) {
              return function (t, r) {
                return e.transporter.write(
                  { method: S, path: "1/strategies/personalization", data: t },
                  r
                );
              };
            };
          function N(e) {
            return (function t(r) {
              return e.request(r).then(function (n) {
                if ((void 0 !== e.batch && e.batch(n.hits), !e.shouldStop(n)))
                  return n.cursor
                    ? t({ cursor: n.cursor })
                    : t({ page: (r.page || 0) + 1 });
              });
            })({});
          }
          var z = function (e) {
              return function (t, i) {
                var a = i || {},
                  c = a.queryParameters,
                  s = n(a, ["queryParameters"]),
                  o = r({ acl: t }, void 0 !== c ? { queryParameters: c } : {});
                return f(
                  e.transporter.write(
                    { method: S, path: "1/keys", data: o },
                    s
                  ),
                  function (t, r) {
                    return l(function (n) {
                      return q(e)(t.key, r).catch(function (e) {
                        if (404 !== e.status) throw e;
                        return n();
                      });
                    });
                  }
                );
              };
            },
            G = function (e) {
              return function (t, r, n) {
                var i = g(n);
                return (
                  (i.queryParameters["X-Algolia-User-ID"] = t),
                  e.transporter.write(
                    {
                      method: S,
                      path: "1/clusters/mapping",
                      data: { cluster: r },
                    },
                    i
                  )
                );
              };
            },
            F = function (e) {
              return function (t, r, n) {
                return e.transporter.write(
                  {
                    method: S,
                    path: "1/clusters/mapping/batch",
                    data: { users: t, cluster: r },
                  },
                  n
                );
              };
            },
            Q = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("/1/dictionaries/%s/batch", t),
                      data: {
                        clearExistingDictionaryEntries: !0,
                        requests: { action: "addEntry", body: [] },
                      },
                    },
                    r
                  ),
                  function (t, r) {
                    return Ie(e)(t.taskID, r);
                  }
                );
              };
            },
            W = function (e) {
              return function (t, r, n) {
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("1/indexes/%s/operation", t),
                      data: { operation: "copy", destination: r },
                    },
                    n
                  ),
                  function (r, n) {
                    return ne(e)(t, { methods: { waitTask: st } }).waitTask(
                      r.taskID,
                      n
                    );
                  }
                );
              };
            },
            C = function (e) {
              return function (t, n, i) {
                return W(e)(t, n, r(r({}, i), {}, { scope: [ut.Rules] }));
              };
            },
            X = function (e) {
              return function (t, n, i) {
                return W(e)(t, n, r(r({}, i), {}, { scope: [ut.Settings] }));
              };
            },
            J = function (e) {
              return function (t, n, i) {
                return W(e)(t, n, r(r({}, i), {}, { scope: [ut.Synonyms] }));
              };
            },
            V = function (e) {
              return function (t, r) {
                return t.method === I
                  ? e.transporter.read(t, r)
                  : e.transporter.write(t, r);
              };
            },
            L = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    { method: v, path: p("1/keys/%s", t) },
                    r
                  ),
                  function (r, n) {
                    return l(function (r) {
                      return q(e)(t, n)
                        .then(r)
                        .catch(function (e) {
                          if (404 !== e.status) throw e;
                        });
                    });
                  }
                );
              };
            },
            Y = function (e) {
              return function (t, r, n) {
                var i = r.map(function (e) {
                  return { action: "deleteEntry", body: { objectID: e } };
                });
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("/1/dictionaries/%s/batch", t),
                      data: { clearExistingDictionaryEntries: !1, requests: i },
                    },
                    n
                  ),
                  function (t, r) {
                    return Ie(e)(t.taskID, r);
                  }
                );
              };
            },
            q = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  { method: I, path: p("1/keys/%s", t) },
                  r
                );
              };
            },
            K = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  { method: I, path: p("1/task/%s", t.toString()) },
                  r
                );
              };
            },
            _ = function (e) {
              return function (t) {
                return e.transporter.read(
                  { method: I, path: "/1/dictionaries/*/settings" },
                  t
                );
              };
            },
            $ = function (e) {
              return function (t) {
                return e.transporter.read({ method: I, path: "1/logs" }, t);
              };
            },
            ee = function (e) {
              return function (t) {
                return e.transporter.read(
                  { method: I, path: "1/clusters/mapping/top" },
                  t
                );
              };
            },
            te = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  { method: I, path: p("1/clusters/mapping/%s", t) },
                  r
                );
              };
            },
            re = function (e) {
              return function (t) {
                var r = t || {},
                  i = r.retrieveMappings,
                  a = n(r, ["retrieveMappings"]);
                return (
                  !0 === i && (a.getClusters = !0),
                  e.transporter.read(
                    { method: I, path: "1/clusters/mapping/pending" },
                    a
                  )
                );
              };
            },
            ne = function (e) {
              return function (t) {
                var r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                return d(
                  { transporter: e.transporter, appId: e.appId, indexName: t },
                  r.methods
                );
              };
            },
            ie = function (e) {
              return function (t) {
                return e.transporter.read({ method: I, path: "1/keys" }, t);
              };
            },
            ae = function (e) {
              return function (t) {
                return e.transporter.read({ method: I, path: "1/clusters" }, t);
              };
            },
            ce = function (e) {
              return function (t) {
                return e.transporter.read({ method: I, path: "1/indexes" }, t);
              };
            },
            se = function (e) {
              return function (t) {
                return e.transporter.read(
                  { method: I, path: "1/clusters/mapping" },
                  t
                );
              };
            },
            oe = function (e) {
              return function (t, r, n) {
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("1/indexes/%s/operation", t),
                      data: { operation: "move", destination: r },
                    },
                    n
                  ),
                  function (r, n) {
                    return ne(e)(t, { methods: { waitTask: st } }).waitTask(
                      r.taskID,
                      n
                    );
                  }
                );
              };
            },
            ue = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: "1/indexes/*/batch",
                      data: { requests: t },
                    },
                    r
                  ),
                  function (t, r) {
                    return Promise.all(
                      Object.keys(t.taskID).map(function (n) {
                        return ne(e)(n, { methods: { waitTask: st } }).waitTask(
                          t.taskID[n],
                          r
                        );
                      })
                    );
                  }
                );
              };
            },
            le = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: S,
                    path: "1/indexes/*/objects",
                    data: { requests: t },
                  },
                  r
                );
              };
            },
            fe = function (e) {
              return function (t, n) {
                var i = t.map(function (e) {
                  return r(r({}, e), {}, { params: E(e.params || {}) });
                });
                return e.transporter.read(
                  {
                    method: S,
                    path: "1/indexes/*/queries",
                    data: { requests: i },
                    cacheable: !0,
                  },
                  n
                );
              };
            },
            he = function (e) {
              return function (t, i) {
                return Promise.all(
                  t.map(function (t) {
                    var a = t.params,
                      c = a.facetName,
                      s = a.facetQuery,
                      o = n(a, ["facetName", "facetQuery"]);
                    return ne(e)(t.indexName, {
                      methods: { searchForFacetValues: nt },
                    }).searchForFacetValues(c, s, r(r({}, i), o));
                  })
                );
              };
            },
            de = function (e) {
              return function (t, r) {
                var n = g(r);
                return (
                  (n.queryParameters["X-Algolia-User-ID"] = t),
                  e.transporter.write(
                    { method: v, path: "1/clusters/mapping" },
                    n
                  )
                );
              };
            },
            pe = function (e) {
              return function (t, r, n) {
                var i = r.map(function (e) {
                  return { action: "addEntry", body: e };
                });
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("/1/dictionaries/%s/batch", t),
                      data: { clearExistingDictionaryEntries: !0, requests: i },
                    },
                    n
                  ),
                  function (t, r) {
                    return Ie(e)(t.taskID, r);
                  }
                );
              };
            },
            me = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    { method: S, path: p("1/keys/%s/restore", t) },
                    r
                  ),
                  function (r, n) {
                    return l(function (r) {
                      return q(e)(t, n).catch(function (e) {
                        if (404 !== e.status) throw e;
                        return r();
                      });
                    });
                  }
                );
              };
            },
            ge = function (e) {
              return function (t, r, n) {
                var i = r.map(function (e) {
                  return { action: "addEntry", body: e };
                });
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("/1/dictionaries/%s/batch", t),
                      data: { clearExistingDictionaryEntries: !1, requests: i },
                    },
                    n
                  ),
                  function (t, r) {
                    return Ie(e)(t.taskID, r);
                  }
                );
              };
            },
            ye = function (e) {
              return function (t, r, n) {
                return e.transporter.read(
                  {
                    method: S,
                    path: p("/1/dictionaries/%s/search", t),
                    data: { query: r },
                    cacheable: !0,
                  },
                  n
                );
              };
            },
            Ae = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: S,
                    path: "1/clusters/mapping/search",
                    data: { query: t },
                  },
                  r
                );
              };
            },
            be = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    { method: w, path: "/1/dictionaries/*/settings", data: t },
                    r
                  ),
                  function (t, r) {
                    return Ie(e)(t.taskID, r);
                  }
                );
              };
            },
            ve = function (e) {
              return function (t, r) {
                var i = Object.assign({}, r),
                  a = r || {},
                  c = a.queryParameters,
                  s = n(a, ["queryParameters"]),
                  o = c ? { queryParameters: c } : {},
                  u = [
                    "acl",
                    "indexes",
                    "referers",
                    "restrictSources",
                    "queryParameters",
                    "description",
                    "maxQueriesPerIPPerHour",
                    "maxHitsPerQuery",
                  ];
                return f(
                  e.transporter.write(
                    { method: w, path: p("1/keys/%s", t), data: o },
                    s
                  ),
                  function (r, n) {
                    return l(function (r) {
                      return q(e)(t, n).then(function (e) {
                        return (function (e) {
                          return Object.keys(i)
                            .filter(function (e) {
                              return -1 !== u.indexOf(e);
                            })
                            .every(function (t) {
                              return e[t] === i[t];
                            });
                        })(e)
                          ? Promise.resolve()
                          : r();
                      });
                    });
                  }
                );
              };
            },
            Ie = function (e) {
              return function (t, r) {
                return l(function (n) {
                  return K(e)(t, r).then(function (e) {
                    return "published" !== e.status ? n() : void 0;
                  });
                });
              };
            },
            Se = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("1/indexes/%s/batch", e.indexName),
                      data: { requests: t },
                    },
                    r
                  ),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            we = function (e) {
              return function (t) {
                return N(
                  r(
                    r(
                      {
                        shouldStop: function (e) {
                          return void 0 === e.cursor;
                        },
                      },
                      t
                    ),
                    {},
                    {
                      request: function (r) {
                        return e.transporter.read(
                          {
                            method: S,
                            path: p("1/indexes/%s/browse", e.indexName),
                            data: r,
                          },
                          t
                        );
                      },
                    }
                  )
                );
              };
            },
            Re = function (e) {
              return function (t) {
                var n = r({ hitsPerPage: 1e3 }, t);
                return N(
                  r(
                    r(
                      {
                        shouldStop: function (e) {
                          return e.hits.length < n.hitsPerPage;
                        },
                      },
                      n
                    ),
                    {},
                    {
                      request: function (t) {
                        return it(e)("", r(r({}, n), t)).then(function (e) {
                          return r(
                            r({}, e),
                            {},
                            {
                              hits: e.hits.map(function (e) {
                                return delete e._highlightResult, e;
                              }),
                            }
                          );
                        });
                      },
                    }
                  )
                );
              };
            },
            je = function (e) {
              return function (t) {
                var n = r({ hitsPerPage: 1e3 }, t);
                return N(
                  r(
                    r(
                      {
                        shouldStop: function (e) {
                          return e.hits.length < n.hitsPerPage;
                        },
                      },
                      n
                    ),
                    {},
                    {
                      request: function (t) {
                        return at(e)("", r(r({}, n), t)).then(function (e) {
                          return r(
                            r({}, e),
                            {},
                            {
                              hits: e.hits.map(function (e) {
                                return delete e._highlightResult, e;
                              }),
                            }
                          );
                        });
                      },
                    }
                  )
                );
              };
            },
            Pe = function (e) {
              return function (t, r, i) {
                var a = i || {},
                  c = a.batchSize,
                  s = n(a, ["batchSize"]),
                  o = { taskIDs: [], objectIDs: [] };
                return f(
                  (function n() {
                    var i,
                      a = [];
                    for (
                      i =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0;
                      i < t.length && (a.push(t[i]), a.length !== (c || 1e3));
                      i++
                    );
                    return 0 === a.length
                      ? Promise.resolve(o)
                      : Se(e)(
                          a.map(function (e) {
                            return { action: r, body: e };
                          }),
                          s
                        ).then(function (e) {
                          return (
                            (o.objectIDs = o.objectIDs.concat(e.objectIDs)),
                            o.taskIDs.push(e.taskID),
                            i++,
                            n(i)
                          );
                        });
                  })(),
                  function (t, r) {
                    return Promise.all(
                      t.taskIDs.map(function (t) {
                        return st(e)(t, r);
                      })
                    );
                  }
                );
              };
            },
            Oe = function (e) {
              return function (t) {
                return f(
                  e.transporter.write(
                    { method: S, path: p("1/indexes/%s/clear", e.indexName) },
                    t
                  ),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            Ee = function (e) {
              return function (t) {
                var r = t || {},
                  i = r.forwardToReplicas,
                  a = g(n(r, ["forwardToReplicas"]));
                return (
                  i && (a.queryParameters.forwardToReplicas = 1),
                  f(
                    e.transporter.write(
                      {
                        method: S,
                        path: p("1/indexes/%s/rules/clear", e.indexName),
                      },
                      a
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            Te = function (e) {
              return function (t) {
                var r = t || {},
                  i = r.forwardToReplicas,
                  a = g(n(r, ["forwardToReplicas"]));
                return (
                  i && (a.queryParameters.forwardToReplicas = 1),
                  f(
                    e.transporter.write(
                      {
                        method: S,
                        path: p("1/indexes/%s/synonyms/clear", e.indexName),
                      },
                      a
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            He = function (e) {
              return function (t, r) {
                return f(
                  e.transporter.write(
                    {
                      method: S,
                      path: p("1/indexes/%s/deleteByQuery", e.indexName),
                      data: t,
                    },
                    r
                  ),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            ke = function (e) {
              return function (t) {
                return f(
                  e.transporter.write(
                    { method: v, path: p("1/indexes/%s", e.indexName) },
                    t
                  ),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            xe = function (e) {
              return function (t, r) {
                return f(
                  Me(e)([t], r).then(function (e) {
                    return { taskID: e.taskIDs[0] };
                  }),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            Me = function (e) {
              return function (t, r) {
                var n = t.map(function (e) {
                  return { objectID: e };
                });
                return Pe(e)(n, ot.DeleteObject, r);
              };
            },
            De = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.forwardToReplicas,
                  c = g(n(i, ["forwardToReplicas"]));
                return (
                  a && (c.queryParameters.forwardToReplicas = 1),
                  f(
                    e.transporter.write(
                      {
                        method: v,
                        path: p("1/indexes/%s/rules/%s", e.indexName, t),
                      },
                      c
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            Ze = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.forwardToReplicas,
                  c = g(n(i, ["forwardToReplicas"]));
                return (
                  a && (c.queryParameters.forwardToReplicas = 1),
                  f(
                    e.transporter.write(
                      {
                        method: v,
                        path: p("1/indexes/%s/synonyms/%s", e.indexName, t),
                      },
                      c
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            Ue = function (e) {
              return function (t) {
                return We(e)(t)
                  .then(function () {
                    return !0;
                  })
                  .catch(function (e) {
                    if (404 !== e.status) throw e;
                    return !1;
                  });
              };
            },
            Be = function (e) {
              return function (t, r, n) {
                return e.transporter.read(
                  {
                    method: S,
                    path: p("1/answers/%s/prediction", e.indexName),
                    data: { query: t, queryLanguages: r },
                    cacheable: !0,
                  },
                  n
                );
              };
            },
            Ne = function (e) {
              return function (t, a) {
                var c = a || {},
                  s = c.query,
                  o = c.paginate,
                  u = n(c, ["query", "paginate"]),
                  l = 0;
                return (function n() {
                  return rt(e)(s || "", r(r({}, u), {}, { page: l })).then(
                    function (e) {
                      for (
                        var r = 0, a = Object.entries(e.hits);
                        r < a.length;
                        r++
                      ) {
                        var c = i(a[r], 2),
                          s = c[0],
                          u = c[1];
                        if (t(u))
                          return {
                            object: u,
                            position: parseInt(s, 10),
                            page: l,
                          };
                      }
                      if ((l++, !1 === o || l >= e.nbPages))
                        throw {
                          name: "ObjectNotFoundError",
                          message: "Object not found.",
                        };
                      return n();
                    }
                  );
                })();
              };
            },
            ze = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  { method: I, path: p("1/indexes/%s/%s", e.indexName, t) },
                  r
                );
              };
            },
            Ge = function () {
              return function (e, t) {
                for (var r = 0, n = Object.entries(e.hits); r < n.length; r++) {
                  var a = i(n[r], 2),
                    c = a[0];
                  if (a[1].objectID === t) return parseInt(c, 10);
                }
                return -1;
              };
            },
            Fe = function (e) {
              return function (t, i) {
                var a = i || {},
                  c = a.attributesToRetrieve,
                  s = n(a, ["attributesToRetrieve"]),
                  o = t.map(function (t) {
                    return r(
                      { indexName: e.indexName, objectID: t },
                      c ? { attributesToRetrieve: c } : {}
                    );
                  });
                return e.transporter.read(
                  {
                    method: S,
                    path: "1/indexes/*/objects",
                    data: { requests: o },
                  },
                  s
                );
              };
            },
            Qe = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: I,
                    path: p("1/indexes/%s/rules/%s", e.indexName, t),
                  },
                  r
                );
              };
            },
            We = function (e) {
              return function (t) {
                return e.transporter.read(
                  {
                    method: I,
                    path: p("1/indexes/%s/settings", e.indexName),
                    data: { getVersion: 2 },
                  },
                  t
                );
              };
            },
            Ce = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: I,
                    path: p("1/indexes/%s/synonyms/%s", e.indexName, t),
                  },
                  r
                );
              };
            },
            Xe = function (e) {
              return function (t, r) {
                return f(
                  Je(e)([t], r).then(function (e) {
                    return { objectID: e.objectIDs[0], taskID: e.taskIDs[0] };
                  }),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            Je = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.createIfNotExists,
                  c = n(i, ["createIfNotExists"]),
                  s = a
                    ? ot.PartialUpdateObject
                    : ot.PartialUpdateObjectNoCreate;
                return Pe(e)(t, s, c);
              };
            },
            Ve = function (e) {
              return function (t, c) {
                var s = c || {},
                  o = s.safe,
                  u = s.autoGenerateObjectIDIfNotExist,
                  l = s.batchSize,
                  h = n(s, [
                    "safe",
                    "autoGenerateObjectIDIfNotExist",
                    "batchSize",
                  ]),
                  d = function (t, r, n, i) {
                    return f(
                      e.transporter.write(
                        {
                          method: S,
                          path: p("1/indexes/%s/operation", t),
                          data: { operation: n, destination: r },
                        },
                        i
                      ),
                      function (t, r) {
                        return st(e)(t.taskID, r);
                      }
                    );
                  },
                  m = Math.random().toString(36).substring(7),
                  g = "".concat(e.indexName, "_tmp_").concat(m),
                  y = Ke({
                    appId: e.appId,
                    transporter: e.transporter,
                    indexName: g,
                  }),
                  A = [],
                  b = d(
                    e.indexName,
                    g,
                    "copy",
                    r(
                      r({}, h),
                      {},
                      { scope: ["settings", "synonyms", "rules"] }
                    )
                  );
                return (
                  A.push(b),
                  f(
                    (o ? b.wait(h) : b)
                      .then(function () {
                        var e = y(
                          t,
                          r(
                            r({}, h),
                            {},
                            { autoGenerateObjectIDIfNotExist: u, batchSize: l }
                          )
                        );
                        return A.push(e), o ? e.wait(h) : e;
                      })
                      .then(function () {
                        var t = d(g, e.indexName, "move", h);
                        return A.push(t), o ? t.wait(h) : t;
                      })
                      .then(function () {
                        return Promise.all(A);
                      })
                      .then(function (e) {
                        var t = i(e, 3),
                          r = t[0],
                          n = t[1],
                          c = t[2];
                        return {
                          objectIDs: n.objectIDs,
                          taskIDs: [r.taskID].concat(a(n.taskIDs), [c.taskID]),
                        };
                      }),
                    function (e, t) {
                      return Promise.all(
                        A.map(function (e) {
                          return e.wait(t);
                        })
                      );
                    }
                  )
                );
              };
            },
            Le = function (e) {
              return function (t, n) {
                return $e(e)(t, r(r({}, n), {}, { clearExistingRules: !0 }));
              };
            },
            Ye = function (e) {
              return function (t, n) {
                return tt(e)(t, r(r({}, n), {}, { clearExistingSynonyms: !0 }));
              };
            },
            qe = function (e) {
              return function (t, r) {
                return f(
                  Ke(e)([t], r).then(function (e) {
                    return { objectID: e.objectIDs[0], taskID: e.taskIDs[0] };
                  }),
                  function (t, r) {
                    return st(e)(t.taskID, r);
                  }
                );
              };
            },
            Ke = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.autoGenerateObjectIDIfNotExist,
                  c = n(i, ["autoGenerateObjectIDIfNotExist"]),
                  s = a ? ot.AddObject : ot.UpdateObject;
                if (s === ot.UpdateObject) {
                  var o = !0,
                    u = !1,
                    l = void 0;
                  try {
                    for (
                      var h, d = t[Symbol.iterator]();
                      !(o = (h = d.next()).done);
                      o = !0
                    )
                      if (void 0 === h.value.objectID)
                        return f(
                          Promise.reject({
                            name: "MissingObjectIDError",
                            message:
                              "All objects must have an unique objectID (like a primary key) to be valid. Algolia is also able to generate objectIDs automatically but *it's not recommended*. To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option.",
                          })
                        );
                  } catch (e) {
                    (u = !0), (l = e);
                  } finally {
                    try {
                      o || null == d.return || d.return();
                    } finally {
                      if (u) throw l;
                    }
                  }
                }
                return Pe(e)(t, s, c);
              };
            },
            _e = function (e) {
              return function (t, r) {
                return $e(e)([t], r);
              };
            },
            $e = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.forwardToReplicas,
                  c = i.clearExistingRules,
                  s = g(n(i, ["forwardToReplicas", "clearExistingRules"]));
                return (
                  a && (s.queryParameters.forwardToReplicas = 1),
                  c && (s.queryParameters.clearExistingRules = 1),
                  f(
                    e.transporter.write(
                      {
                        method: S,
                        path: p("1/indexes/%s/rules/batch", e.indexName),
                        data: t,
                      },
                      s
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            et = function (e) {
              return function (t, r) {
                return tt(e)([t], r);
              };
            },
            tt = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.forwardToReplicas,
                  c = i.clearExistingSynonyms,
                  s = i.replaceExistingSynonyms,
                  o = g(
                    n(i, [
                      "forwardToReplicas",
                      "clearExistingSynonyms",
                      "replaceExistingSynonyms",
                    ])
                  );
                return (
                  a && (o.queryParameters.forwardToReplicas = 1),
                  (s || c) && (o.queryParameters.replaceExistingSynonyms = 1),
                  f(
                    e.transporter.write(
                      {
                        method: S,
                        path: p("1/indexes/%s/synonyms/batch", e.indexName),
                        data: t,
                      },
                      o
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            rt = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: S,
                    path: p("1/indexes/%s/query", e.indexName),
                    data: { query: t },
                    cacheable: !0,
                  },
                  r
                );
              };
            },
            nt = function (e) {
              return function (t, r, n) {
                return e.transporter.read(
                  {
                    method: S,
                    path: p("1/indexes/%s/facets/%s/query", e.indexName, t),
                    data: { facetQuery: r },
                    cacheable: !0,
                  },
                  n
                );
              };
            },
            it = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: S,
                    path: p("1/indexes/%s/rules/search", e.indexName),
                    data: { query: t },
                  },
                  r
                );
              };
            },
            at = function (e) {
              return function (t, r) {
                return e.transporter.read(
                  {
                    method: S,
                    path: p("1/indexes/%s/synonyms/search", e.indexName),
                    data: { query: t },
                  },
                  r
                );
              };
            },
            ct = function (e) {
              return function (t, r) {
                var i = r || {},
                  a = i.forwardToReplicas,
                  c = g(n(i, ["forwardToReplicas"]));
                return (
                  a && (c.queryParameters.forwardToReplicas = 1),
                  f(
                    e.transporter.write(
                      {
                        method: w,
                        path: p("1/indexes/%s/settings", e.indexName),
                        data: t,
                      },
                      c
                    ),
                    function (t, r) {
                      return st(e)(t.taskID, r);
                    }
                  )
                );
              };
            },
            st = function (e) {
              return function (t, r) {
                return l(function (n) {
                  return (function (e) {
                    return function (t, r) {
                      return e.transporter.read(
                        {
                          method: I,
                          path: p(
                            "1/indexes/%s/task/%s",
                            e.indexName,
                            t.toString()
                          ),
                        },
                        r
                      );
                    };
                  })(e)(t, r).then(function (e) {
                    return "published" !== e.status ? n() : void 0;
                  });
                });
              };
            },
            ot = {
              AddObject: "addObject",
              UpdateObject: "updateObject",
              PartialUpdateObject: "partialUpdateObject",
              PartialUpdateObjectNoCreate: "partialUpdateObjectNoCreate",
              DeleteObject: "deleteObject",
              DeleteIndex: "delete",
              ClearIndex: "clear",
            },
            ut = { Settings: "settings", Synonyms: "synonyms", Rules: "rules" };
          function lt(e, t, n) {
            var i = {
                appId: e,
                apiKey: t,
                timeouts: { connect: 1, read: 2, write: 30 },
                requester: {
                  send: function (e) {
                    return new Promise(function (t) {
                      var r = new XMLHttpRequest();
                      r.open(e.method, e.url, !0),
                        Object.keys(e.headers).forEach(function (t) {
                          return r.setRequestHeader(t, e.headers[t]);
                        });
                      var n,
                        i = function (e, n) {
                          return setTimeout(function () {
                            r.abort(),
                              t({ status: 0, content: n, isTimedOut: !0 });
                          }, 1e3 * e);
                        },
                        a = i(e.connectTimeout, "Connection timeout");
                      (r.onreadystatechange = function () {
                        r.readyState > r.OPENED &&
                          void 0 === n &&
                          (clearTimeout(a),
                          (n = i(e.responseTimeout, "Socket timeout")));
                      }),
                        (r.onerror = function () {
                          0 === r.status &&
                            (clearTimeout(a),
                            clearTimeout(n),
                            t({
                              content:
                                r.responseText || "Network request failed",
                              status: r.status,
                              isTimedOut: !1,
                            }));
                        }),
                        (r.onload = function () {
                          clearTimeout(a),
                            clearTimeout(n),
                            t({
                              content: r.responseText,
                              status: r.status,
                              isTimedOut: !1,
                            });
                        }),
                        r.send(e.data);
                    });
                  },
                },
                logger:
                  (3,
                  {
                    debug: function (e, t) {
                      return Promise.resolve();
                    },
                    info: function (e, t) {
                      return Promise.resolve();
                    },
                    error: function (e, t) {
                      return console.error(e, t), Promise.resolve();
                    },
                  }),
                responsesCache: o(),
                requestsCache: o({ serializable: !1 }),
                hostsCache: s({
                  caches: [c({ key: "".concat("4.17.0", "-").concat(e) }), o()],
                }),
                userAgent: P("4.17.0").add({ segment: "Browser" }),
              },
              a = r(r({}, i), n),
              l = function () {
                return function (e) {
                  return (function (e) {
                    var t = e.region || "us",
                      n = u(m.WithinHeaders, e.appId, e.apiKey),
                      i = j(
                        r(
                          r(
                            {
                              hosts: [
                                {
                                  url: "personalization.".concat(
                                    t,
                                    ".algolia.com"
                                  ),
                                },
                              ],
                            },
                            e
                          ),
                          {},
                          {
                            headers: r(
                              r(r({}, n.headers()), {
                                "content-type": "application/json",
                              }),
                              e.headers
                            ),
                            queryParameters: r(
                              r({}, n.queryParameters()),
                              e.queryParameters
                            ),
                          }
                        )
                      );
                    return d({ appId: e.appId, transporter: i }, e.methods);
                  })(
                    r(
                      r(r({}, i), e),
                      {},
                      {
                        methods: {
                          getPersonalizationStrategy: U,
                          setPersonalizationStrategy: B,
                        },
                      }
                    )
                  );
                };
              };
            return (function (e) {
              var t = e.appId,
                n = u(
                  void 0 !== e.authMode ? e.authMode : m.WithinHeaders,
                  t,
                  e.apiKey
                ),
                i = j(
                  r(
                    r(
                      {
                        hosts: [
                          {
                            url: "".concat(t, "-dsn.algolia.net"),
                            accept: y.Read,
                          },
                          {
                            url: "".concat(t, ".algolia.net"),
                            accept: y.Write,
                          },
                        ].concat(
                          h([
                            { url: "".concat(t, "-1.algolianet.com") },
                            { url: "".concat(t, "-2.algolianet.com") },
                            { url: "".concat(t, "-3.algolianet.com") },
                          ])
                        ),
                      },
                      e
                    ),
                    {},
                    {
                      headers: r(
                        r(r({}, n.headers()), {
                          "content-type": "application/x-www-form-urlencoded",
                        }),
                        e.headers
                      ),
                      queryParameters: r(
                        r({}, n.queryParameters()),
                        e.queryParameters
                      ),
                    }
                  )
                );
              return d(
                {
                  transporter: i,
                  appId: t,
                  addAlgoliaAgent: function (e, t) {
                    i.userAgent.add({ segment: e, version: t });
                  },
                  clearCache: function () {
                    return Promise.all([
                      i.requestsCache.clear(),
                      i.responsesCache.clear(),
                    ]).then(function () {});
                  },
                },
                e.methods
              );
            })(
              r(
                r({}, a),
                {},
                {
                  methods: {
                    search: fe,
                    searchForFacetValues: he,
                    multipleBatch: ue,
                    multipleGetObjects: le,
                    multipleQueries: fe,
                    copyIndex: W,
                    copySettings: X,
                    copySynonyms: J,
                    copyRules: C,
                    moveIndex: oe,
                    listIndices: ce,
                    getLogs: $,
                    listClusters: ae,
                    multipleSearchForFacetValues: he,
                    getApiKey: q,
                    addApiKey: z,
                    listApiKeys: ie,
                    updateApiKey: ve,
                    deleteApiKey: L,
                    restoreApiKey: me,
                    assignUserID: G,
                    assignUserIDs: F,
                    getUserID: te,
                    searchUserIDs: Ae,
                    listUserIDs: se,
                    getTopUserIDs: ee,
                    removeUserID: de,
                    hasPendingMappings: re,
                    clearDictionaryEntries: Q,
                    deleteDictionaryEntries: Y,
                    getDictionarySettings: _,
                    getAppTask: K,
                    replaceDictionaryEntries: pe,
                    saveDictionaryEntries: ge,
                    searchDictionaryEntries: ye,
                    setDictionarySettings: be,
                    waitAppTask: Ie,
                    customRequest: V,
                    initIndex: function (e) {
                      return function (t) {
                        return ne(e)(t, {
                          methods: {
                            batch: Se,
                            delete: ke,
                            findAnswers: Be,
                            getObject: ze,
                            getObjects: Fe,
                            saveObject: qe,
                            saveObjects: Ke,
                            search: rt,
                            searchForFacetValues: nt,
                            waitTask: st,
                            setSettings: ct,
                            getSettings: We,
                            partialUpdateObject: Xe,
                            partialUpdateObjects: Je,
                            deleteObject: xe,
                            deleteObjects: Me,
                            deleteBy: He,
                            clearObjects: Oe,
                            browseObjects: we,
                            getObjectPosition: Ge,
                            findObject: Ne,
                            exists: Ue,
                            saveSynonym: et,
                            saveSynonyms: tt,
                            getSynonym: Ce,
                            searchSynonyms: at,
                            browseSynonyms: je,
                            deleteSynonym: Ze,
                            clearSynonyms: Te,
                            replaceAllObjects: Ve,
                            replaceAllSynonyms: Ye,
                            searchRules: it,
                            getRule: Qe,
                            deleteRule: De,
                            saveRule: _e,
                            saveRules: $e,
                            replaceAllRules: Le,
                            browseRules: Re,
                            clearRules: Ee,
                          },
                        });
                      };
                    },
                    initAnalytics: function () {
                      return function (e) {
                        return (function (e) {
                          var t = e.region || "us",
                            n = u(m.WithinHeaders, e.appId, e.apiKey),
                            i = j(
                              r(
                                r(
                                  {
                                    hosts: [
                                      {
                                        url: "analytics.".concat(
                                          t,
                                          ".algolia.com"
                                        ),
                                      },
                                    ],
                                  },
                                  e
                                ),
                                {},
                                {
                                  headers: r(
                                    r(r({}, n.headers()), {
                                      "content-type": "application/json",
                                    }),
                                    e.headers
                                  ),
                                  queryParameters: r(
                                    r({}, n.queryParameters()),
                                    e.queryParameters
                                  ),
                                }
                              )
                            );
                          return d(
                            { appId: e.appId, transporter: i },
                            e.methods
                          );
                        })(
                          r(
                            r(r({}, i), e),
                            {},
                            {
                              methods: {
                                addABTest: k,
                                getABTest: M,
                                getABTests: D,
                                stopABTest: Z,
                                deleteABTest: x,
                              },
                            }
                          )
                        );
                      };
                    },
                    initPersonalization: l,
                    initRecommendation: function () {
                      return function (e) {
                        return (
                          a.logger.info(
                            "The `initRecommendation` method is deprecated. Use `initPersonalization` instead."
                          ),
                          l()(e)
                        );
                      };
                    },
                  },
                }
              )
            );
          }
          return (lt.version = "4.17.0"), lt;
        })();
      },
      904: (e) => {
        "use strict";
        var t = String.prototype.replace,
          r = /%20/g,
          n = "RFC3986";
        e.exports = {
          default: n,
          formatters: {
            RFC1738: function (e) {
              return t.call(e, r, "+");
            },
            RFC3986: function (e) {
              return String(e);
            },
          },
          RFC1738: "RFC1738",
          RFC3986: n,
        };
      },
      368: (e, t, r) => {
        "use strict";
        var n = r(307),
          i = r(316),
          a = r(904);
        e.exports = { formats: a, parse: i, stringify: n };
      },
      316: (e, t, r) => {
        "use strict";
        var n = r(84),
          i = Object.prototype.hasOwnProperty,
          a = Array.isArray,
          c = {
            allowDots: !1,
            allowPrototypes: !1,
            arrayLimit: 20,
            charset: "utf-8",
            charsetSentinel: !1,
            comma: !1,
            decoder: n.decode,
            delimiter: "&",
            depth: 5,
            ignoreQueryPrefix: !1,
            interpretNumericEntities: !1,
            parameterLimit: 1e3,
            parseArrays: !0,
            plainObjects: !1,
            strictNullHandling: !1,
          },
          s = function (e) {
            return e.replace(/&#(\d+);/g, function (e, t) {
              return String.fromCharCode(parseInt(t, 10));
            });
          },
          o = function (e, t) {
            return e && "string" == typeof e && t.comma && e.indexOf(",") > -1
              ? e.split(",")
              : e;
          },
          u = function (e, t, r, n) {
            if (e) {
              var a = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e,
                c = /(\[[^[\]]*])/g,
                s = r.depth > 0 && /(\[[^[\]]*])/.exec(a),
                u = s ? a.slice(0, s.index) : a,
                l = [];
              if (u) {
                if (
                  !r.plainObjects &&
                  i.call(Object.prototype, u) &&
                  !r.allowPrototypes
                )
                  return;
                l.push(u);
              }
              for (
                var f = 0;
                r.depth > 0 && null !== (s = c.exec(a)) && f < r.depth;

              ) {
                if (
                  ((f += 1),
                  !r.plainObjects &&
                    i.call(Object.prototype, s[1].slice(1, -1)) &&
                    !r.allowPrototypes)
                )
                  return;
                l.push(s[1]);
              }
              return (
                s && l.push("[" + a.slice(s.index) + "]"),
                (function (e, t, r, n) {
                  for (var i = n ? t : o(t, r), a = e.length - 1; a >= 0; --a) {
                    var c,
                      s = e[a];
                    if ("[]" === s && r.parseArrays) c = [].concat(i);
                    else {
                      c = r.plainObjects ? Object.create(null) : {};
                      var u =
                          "[" === s.charAt(0) && "]" === s.charAt(s.length - 1)
                            ? s.slice(1, -1)
                            : s,
                        l = parseInt(u, 10);
                      r.parseArrays || "" !== u
                        ? !isNaN(l) &&
                          s !== u &&
                          String(l) === u &&
                          l >= 0 &&
                          r.parseArrays &&
                          l <= r.arrayLimit
                          ? ((c = [])[l] = i)
                          : "__proto__" !== u && (c[u] = i)
                        : (c = { 0: i });
                    }
                    i = c;
                  }
                  return i;
                })(l, t, r, n)
              );
            }
          };
        e.exports = function (e, t) {
          var r = (function (e) {
            if (!e) return c;
            if (
              null !== e.decoder &&
              void 0 !== e.decoder &&
              "function" != typeof e.decoder
            )
              throw new TypeError("Decoder has to be a function.");
            if (
              void 0 !== e.charset &&
              "utf-8" !== e.charset &&
              "iso-8859-1" !== e.charset
            )
              throw new TypeError(
                "The charset option must be either utf-8, iso-8859-1, or undefined"
              );
            var t = void 0 === e.charset ? c.charset : e.charset;
            return {
              allowDots: void 0 === e.allowDots ? c.allowDots : !!e.allowDots,
              allowPrototypes:
                "boolean" == typeof e.allowPrototypes
                  ? e.allowPrototypes
                  : c.allowPrototypes,
              arrayLimit:
                "number" == typeof e.arrayLimit ? e.arrayLimit : c.arrayLimit,
              charset: t,
              charsetSentinel:
                "boolean" == typeof e.charsetSentinel
                  ? e.charsetSentinel
                  : c.charsetSentinel,
              comma: "boolean" == typeof e.comma ? e.comma : c.comma,
              decoder: "function" == typeof e.decoder ? e.decoder : c.decoder,
              delimiter:
                "string" == typeof e.delimiter || n.isRegExp(e.delimiter)
                  ? e.delimiter
                  : c.delimiter,
              depth:
                "number" == typeof e.depth || !1 === e.depth
                  ? +e.depth
                  : c.depth,
              ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
              interpretNumericEntities:
                "boolean" == typeof e.interpretNumericEntities
                  ? e.interpretNumericEntities
                  : c.interpretNumericEntities,
              parameterLimit:
                "number" == typeof e.parameterLimit
                  ? e.parameterLimit
                  : c.parameterLimit,
              parseArrays: !1 !== e.parseArrays,
              plainObjects:
                "boolean" == typeof e.plainObjects
                  ? e.plainObjects
                  : c.plainObjects,
              strictNullHandling:
                "boolean" == typeof e.strictNullHandling
                  ? e.strictNullHandling
                  : c.strictNullHandling,
            };
          })(t);
          if ("" === e || null == e)
            return r.plainObjects ? Object.create(null) : {};
          for (
            var l =
                "string" == typeof e
                  ? (function (e, t) {
                      var r,
                        u = {},
                        l = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e,
                        f =
                          t.parameterLimit === 1 / 0
                            ? void 0
                            : t.parameterLimit,
                        h = l.split(t.delimiter, f),
                        d = -1,
                        p = t.charset;
                      if (t.charsetSentinel)
                        for (r = 0; r < h.length; ++r)
                          0 === h[r].indexOf("utf8=") &&
                            ("utf8=%E2%9C%93" === h[r]
                              ? (p = "utf-8")
                              : "utf8=%26%2310003%3B" === h[r] &&
                                (p = "iso-8859-1"),
                            (d = r),
                            (r = h.length));
                      for (r = 0; r < h.length; ++r)
                        if (r !== d) {
                          var m,
                            g,
                            y = h[r],
                            A = y.indexOf("]="),
                            b = -1 === A ? y.indexOf("=") : A + 1;
                          -1 === b
                            ? ((m = t.decoder(y, c.decoder, p, "key")),
                              (g = t.strictNullHandling ? null : ""))
                            : ((m = t.decoder(
                                y.slice(0, b),
                                c.decoder,
                                p,
                                "key"
                              )),
                              (g = n.maybeMap(
                                o(y.slice(b + 1), t),
                                function (e) {
                                  return t.decoder(e, c.decoder, p, "value");
                                }
                              ))),
                            g &&
                              t.interpretNumericEntities &&
                              "iso-8859-1" === p &&
                              (g = s(g)),
                            y.indexOf("[]=") > -1 && (g = a(g) ? [g] : g),
                            i.call(u, m)
                              ? (u[m] = n.combine(u[m], g))
                              : (u[m] = g);
                        }
                      return u;
                    })(e, r)
                  : e,
              f = r.plainObjects ? Object.create(null) : {},
              h = Object.keys(l),
              d = 0;
            d < h.length;
            ++d
          ) {
            var p = h[d],
              m = u(p, l[p], r, "string" == typeof e);
            f = n.merge(f, m, r);
          }
          return n.compact(f);
        };
      },
      307: (e, t, r) => {
        "use strict";
        var n = r(84),
          i = r(904),
          a = Object.prototype.hasOwnProperty,
          c = {
            brackets: function (e) {
              return e + "[]";
            },
            comma: "comma",
            indices: function (e, t) {
              return e + "[" + t + "]";
            },
            repeat: function (e) {
              return e;
            },
          },
          s = Array.isArray,
          o = String.prototype.split,
          u = Array.prototype.push,
          l = function (e, t) {
            u.apply(e, s(t) ? t : [t]);
          },
          f = Date.prototype.toISOString,
          h = i.default,
          d = {
            addQueryPrefix: !1,
            allowDots: !1,
            charset: "utf-8",
            charsetSentinel: !1,
            delimiter: "&",
            encode: !0,
            encoder: n.encode,
            encodeValuesOnly: !1,
            format: h,
            formatter: i.formatters[h],
            indices: !1,
            serializeDate: function (e) {
              return f.call(e);
            },
            skipNulls: !1,
            strictNullHandling: !1,
          },
          p = function e(t, r, i, a, c, u, f, h, p, m, g, y, A, b) {
            var v,
              I = t;
            if (
              ("function" == typeof f
                ? (I = f(r, I))
                : I instanceof Date
                ? (I = m(I))
                : "comma" === i &&
                  s(I) &&
                  (I = n.maybeMap(I, function (e) {
                    return e instanceof Date ? m(e) : e;
                  })),
              null === I)
            ) {
              if (a) return u && !A ? u(r, d.encoder, b, "key", g) : r;
              I = "";
            }
            if (
              "string" == typeof (v = I) ||
              "number" == typeof v ||
              "boolean" == typeof v ||
              "symbol" == typeof v ||
              "bigint" == typeof v ||
              n.isBuffer(I)
            ) {
              if (u) {
                var S = A ? r : u(r, d.encoder, b, "key", g);
                if ("comma" === i && A) {
                  for (
                    var w = o.call(String(I), ","), R = "", j = 0;
                    j < w.length;
                    ++j
                  )
                    R +=
                      (0 === j ? "" : ",") +
                      y(u(w[j], d.encoder, b, "value", g));
                  return [y(S) + "=" + R];
                }
                return [y(S) + "=" + y(u(I, d.encoder, b, "value", g))];
              }
              return [y(r) + "=" + y(String(I))];
            }
            var P,
              O = [];
            if (void 0 === I) return O;
            if ("comma" === i && s(I))
              P = [{ value: I.length > 0 ? I.join(",") || null : void 0 }];
            else if (s(f)) P = f;
            else {
              var E = Object.keys(I);
              P = h ? E.sort(h) : E;
            }
            for (var T = 0; T < P.length; ++T) {
              var H = P[T],
                k = "object" == typeof H && void 0 !== H.value ? H.value : I[H];
              if (!c || null !== k) {
                var x = s(I)
                  ? "function" == typeof i
                    ? i(r, H)
                    : r
                  : r + (p ? "." + H : "[" + H + "]");
                l(O, e(k, x, i, a, c, u, f, h, p, m, g, y, A, b));
              }
            }
            return O;
          };
        e.exports = function (e, t) {
          var r,
            n = e,
            o = (function (e) {
              if (!e) return d;
              if (
                null !== e.encoder &&
                void 0 !== e.encoder &&
                "function" != typeof e.encoder
              )
                throw new TypeError("Encoder has to be a function.");
              var t = e.charset || d.charset;
              if (
                void 0 !== e.charset &&
                "utf-8" !== e.charset &&
                "iso-8859-1" !== e.charset
              )
                throw new TypeError(
                  "The charset option must be either utf-8, iso-8859-1, or undefined"
                );
              var r = i.default;
              if (void 0 !== e.format) {
                if (!a.call(i.formatters, e.format))
                  throw new TypeError("Unknown format option provided.");
                r = e.format;
              }
              var n = i.formatters[r],
                c = d.filter;
              return (
                ("function" == typeof e.filter || s(e.filter)) &&
                  (c = e.filter),
                {
                  addQueryPrefix:
                    "boolean" == typeof e.addQueryPrefix
                      ? e.addQueryPrefix
                      : d.addQueryPrefix,
                  allowDots:
                    void 0 === e.allowDots ? d.allowDots : !!e.allowDots,
                  charset: t,
                  charsetSentinel:
                    "boolean" == typeof e.charsetSentinel
                      ? e.charsetSentinel
                      : d.charsetSentinel,
                  delimiter: void 0 === e.delimiter ? d.delimiter : e.delimiter,
                  encode: "boolean" == typeof e.encode ? e.encode : d.encode,
                  encoder:
                    "function" == typeof e.encoder ? e.encoder : d.encoder,
                  encodeValuesOnly:
                    "boolean" == typeof e.encodeValuesOnly
                      ? e.encodeValuesOnly
                      : d.encodeValuesOnly,
                  filter: c,
                  format: r,
                  formatter: n,
                  serializeDate:
                    "function" == typeof e.serializeDate
                      ? e.serializeDate
                      : d.serializeDate,
                  skipNulls:
                    "boolean" == typeof e.skipNulls ? e.skipNulls : d.skipNulls,
                  sort: "function" == typeof e.sort ? e.sort : null,
                  strictNullHandling:
                    "boolean" == typeof e.strictNullHandling
                      ? e.strictNullHandling
                      : d.strictNullHandling,
                }
              );
            })(t);
          "function" == typeof o.filter
            ? (n = (0, o.filter)("", n))
            : s(o.filter) && (r = o.filter);
          var u,
            f = [];
          if ("object" != typeof n || null === n) return "";
          u =
            t && t.arrayFormat in c
              ? t.arrayFormat
              : t && "indices" in t
              ? t.indices
                ? "indices"
                : "repeat"
              : "indices";
          var h = c[u];
          r || (r = Object.keys(n)), o.sort && r.sort(o.sort);
          for (var m = 0; m < r.length; ++m) {
            var g = r[m];
            (o.skipNulls && null === n[g]) ||
              l(
                f,
                p(
                  n[g],
                  g,
                  h,
                  o.strictNullHandling,
                  o.skipNulls,
                  o.encode ? o.encoder : null,
                  o.filter,
                  o.sort,
                  o.allowDots,
                  o.serializeDate,
                  o.format,
                  o.formatter,
                  o.encodeValuesOnly,
                  o.charset
                )
              );
          }
          var y = f.join(o.delimiter),
            A = !0 === o.addQueryPrefix ? "?" : "";
          return (
            o.charsetSentinel &&
              ("iso-8859-1" === o.charset
                ? (A += "utf8=%26%2310003%3B&")
                : (A += "utf8=%E2%9C%93&")),
            y.length > 0 ? A + y : ""
          );
        };
      },
      84: (e, t, r) => {
        "use strict";
        var n = r(904),
          i = Object.prototype.hasOwnProperty,
          a = Array.isArray,
          c = (function () {
            for (var e = [], t = 0; t < 256; ++t)
              e.push(
                "%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase()
              );
            return e;
          })(),
          s = function (e, t) {
            for (
              var r = t && t.plainObjects ? Object.create(null) : {}, n = 0;
              n < e.length;
              ++n
            )
              void 0 !== e[n] && (r[n] = e[n]);
            return r;
          };
        e.exports = {
          arrayToObject: s,
          assign: function (e, t) {
            return Object.keys(t).reduce(function (e, r) {
              return (e[r] = t[r]), e;
            }, e);
          },
          combine: function (e, t) {
            return [].concat(e, t);
          },
          compact: function (e) {
            for (
              var t = [{ obj: { o: e }, prop: "o" }], r = [], n = 0;
              n < t.length;
              ++n
            )
              for (
                var i = t[n], c = i.obj[i.prop], s = Object.keys(c), o = 0;
                o < s.length;
                ++o
              ) {
                var u = s[o],
                  l = c[u];
                "object" == typeof l &&
                  null !== l &&
                  -1 === r.indexOf(l) &&
                  (t.push({ obj: c, prop: u }), r.push(l));
              }
            return (
              (function (e) {
                for (; e.length > 1; ) {
                  var t = e.pop(),
                    r = t.obj[t.prop];
                  if (a(r)) {
                    for (var n = [], i = 0; i < r.length; ++i)
                      void 0 !== r[i] && n.push(r[i]);
                    t.obj[t.prop] = n;
                  }
                }
              })(t),
              e
            );
          },
          decode: function (e, t, r) {
            var n = e.replace(/\+/g, " ");
            if ("iso-8859-1" === r)
              return n.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
              return decodeURIComponent(n);
            } catch (e) {
              return n;
            }
          },
          encode: function (e, t, r, i, a) {
            if (0 === e.length) return e;
            var s = e;
            if (
              ("symbol" == typeof e
                ? (s = Symbol.prototype.toString.call(e))
                : "string" != typeof e && (s = String(e)),
              "iso-8859-1" === r)
            )
              return escape(s).replace(/%u[0-9a-f]{4}/gi, function (e) {
                return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
              });
            for (var o = "", u = 0; u < s.length; ++u) {
              var l = s.charCodeAt(u);
              45 === l ||
              46 === l ||
              95 === l ||
              126 === l ||
              (l >= 48 && l <= 57) ||
              (l >= 65 && l <= 90) ||
              (l >= 97 && l <= 122) ||
              (a === n.RFC1738 && (40 === l || 41 === l))
                ? (o += s.charAt(u))
                : l < 128
                ? (o += c[l])
                : l < 2048
                ? (o += c[192 | (l >> 6)] + c[128 | (63 & l)])
                : l < 55296 || l >= 57344
                ? (o +=
                    c[224 | (l >> 12)] +
                    c[128 | ((l >> 6) & 63)] +
                    c[128 | (63 & l)])
                : ((u += 1),
                  (l = 65536 + (((1023 & l) << 10) | (1023 & s.charCodeAt(u)))),
                  (o +=
                    c[240 | (l >> 18)] +
                    c[128 | ((l >> 12) & 63)] +
                    c[128 | ((l >> 6) & 63)] +
                    c[128 | (63 & l)]));
            }
            return o;
          },
          isBuffer: function (e) {
            return !(
              !e ||
              "object" != typeof e ||
              !(
                e.constructor &&
                e.constructor.isBuffer &&
                e.constructor.isBuffer(e)
              )
            );
          },
          isRegExp: function (e) {
            return "[object RegExp]" === Object.prototype.toString.call(e);
          },
          maybeMap: function (e, t) {
            if (a(e)) {
              for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
              return r;
            }
            return t(e);
          },
          merge: function e(t, r, n) {
            if (!r) return t;
            if ("object" != typeof r) {
              if (a(t)) t.push(r);
              else {
                if (!t || "object" != typeof t) return [t, r];
                ((n && (n.plainObjects || n.allowPrototypes)) ||
                  !i.call(Object.prototype, r)) &&
                  (t[r] = !0);
              }
              return t;
            }
            if (!t || "object" != typeof t) return [t].concat(r);
            var c = t;
            return (
              a(t) && !a(r) && (c = s(t, n)),
              a(t) && a(r)
                ? (r.forEach(function (r, a) {
                    if (i.call(t, a)) {
                      var c = t[a];
                      c && "object" == typeof c && r && "object" == typeof r
                        ? (t[a] = e(c, r, n))
                        : t.push(r);
                    } else t[a] = r;
                  }),
                  t)
                : Object.keys(r).reduce(function (t, a) {
                    var c = r[a];
                    return (
                      i.call(t, a) ? (t[a] = e(t[a], c, n)) : (t[a] = c), t
                    );
                  }, c)
            );
          },
        };
      },
      250: (e, t, r) => {
        "use strict";
        var n = r(196),
          i =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          a = n.useState,
          c = n.useEffect,
          s = n.useLayoutEffect,
          o = n.useDebugValue;
        function u(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var r = t();
            return !i(e, r);
          } catch (e) {
            return !0;
          }
        }
        var l =
          "undefined" == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
            ? function (e, t) {
                return t();
              }
            : function (e, t) {
                var r = t(),
                  n = a({ inst: { value: r, getSnapshot: t } }),
                  i = n[0].inst,
                  l = n[1];
                return (
                  s(
                    function () {
                      (i.value = r),
                        (i.getSnapshot = t),
                        u(i) && l({ inst: i });
                    },
                    [e, r, t]
                  ),
                  c(
                    function () {
                      return (
                        u(i) && l({ inst: i }),
                        e(function () {
                          u(i) && l({ inst: i });
                        })
                      );
                    },
                    [e]
                  ),
                  o(r),
                  r
                );
              };
        t.useSyncExternalStore =
          void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : l;
      },
      688: (e, t, r) => {
        "use strict";
        e.exports = r(250);
      },
      196: (e) => {
        "use strict";
        e.exports = window.React;
      },
    },
    t = {};
  function r(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var a = (t[n] = { exports: {} });
    return e[n].call(a.exports, a, a.exports, r), a.exports;
  }
  (r.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return r.d(t, { a: t }), t;
  }),
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) &&
          !r.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    });
  var n = {};
  (() => {
    "use strict";
    r.d(n, { z: () => Xn });
    var e = {};
    r.r(e),
      r.d(e, {
        initializeNamespace: () => h,
        updateHiiveDebounceInstance: () => y,
        updateHiiveDebounceTime: () => g,
        updateHiiveEventsQueue: () => p,
        updateHiiveEventsQueueThreshold: () => m,
        updateHiiveUrls: () => d,
      });
    var t = {};
    r.r(t),
      r.d(t, {
        getHiiveBatchUrl: () => I,
        getHiiveDebounce: () => S,
        getHiiveEventsQueue: () => A,
        getHiiveEventsQueueThreshold: () => b,
        getHiiveSingleUrl: () => v,
      });
    const i = window.wp.element,
      a = window.wp.editPost,
      c = window.wp.plugins,
      s = window.wp.domReady;
    var o = r.n(s);
    const u = window.wp.data;
    class l {
      constructor(e, t, r, n) {
        (this.category = e),
          (this.action = t),
          (this.data = r),
          (this.namespace = n);
      }
    }
    const f = {
      urls: { single: void 0, batch: void 0 },
      queue: { events: [], threshold: 100 },
      debounce: { time: void 0, instance: void 0 },
    };
    function h(e) {
      return { type: "INITIALIZE_NAMESPACE", namespace: e };
    }
    function d(e, t) {
      return { type: "UPDATE_HIIVE_URLS", urls: e, namespace: t };
    }
    function p(e, t) {
      return { type: "UPDATE_HIIVE_EVENTS_QUEUE", events: e, namespace: t };
    }
    function m(e, t) {
      return {
        type: "UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD",
        threshold: e,
        namespace: t,
      };
    }
    function g(e, t) {
      return {
        type: "UPDATE_HIIVE_DEBOUNCE_TIME",
        debounceTime: e,
        namespace: t,
      };
    }
    function y(e, t) {
      return {
        type: "UPDATE_HIIVE_DEBOUNCE_INSTANCE",
        instance: e,
        namespace: t,
      };
    }
    function A(e, t) {
      return e.hiive[t]?.queue.events;
    }
    function b(e, t) {
      return e.hiive[t]?.queue.threshold;
    }
    function v(e, t) {
      return e.hiive[t]?.urls.single;
    }
    function I(e, t) {
      return e.hiive[t]?.urls.batch;
    }
    function S(e, t) {
      return e.hiive[t]?.debounce;
    }
    const w = {
        reducer: (0, u.combineReducers)({
          hiive: (e, t) => {
            switch (t.type) {
              case "INITIALIZE_NAMESPACE":
                return { ...e, [t.namespace]: f };
              case "UPDATE_HIIVE_URLS":
                return {
                  ...e,
                  [t.namespace]: {
                    ...e[t.namespace],
                    urls: { single: t.urls.single, batch: t.urls.batch },
                  },
                };
              case "UPDATE_HIIVE_EVENTS_QUEUE":
                return {
                  ...e,
                  [t.namespace]: {
                    ...e[t.namespace],
                    queue: {
                      events: t.events,
                      threshold: e[t.namespace].queue.threshold,
                    },
                  },
                };
              case "UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD":
                return {
                  ...e,
                  [t.namespace]: {
                    ...e[t.namespace],
                    queue: {
                      events: e[t.namespace].queue.events,
                      threshold: t.threshold,
                    },
                  },
                };
              case "UPDATE_HIIVE_DEBOUNCE_TIME":
                return {
                  ...e,
                  [t.namespace]: {
                    ...e[t.namespace],
                    debounce: {
                      time: t.debounceTime,
                      instance: e[t.namespace].debounce.instance,
                    },
                  },
                };
              case "UPDATE_HIIVE_DEBOUNCE_INSTANCE":
                return {
                  ...e,
                  [t.namespace]: {
                    ...e[t.namespace],
                    debounce: {
                      time: e[t.namespace].debounce.time,
                      instance: t.instance,
                    },
                  },
                };
            }
            return e;
          },
        }),
        actions: e,
        selectors: t,
      },
      R = (0, u.createReduxStore)("newfold/ui-analytics", w);
    (0, u.register)(R);
    const j = window.wp.apiFetch;
    var P = r.n(j);
    const O = (e) =>
        !!window?.nfdUIAnalytics?.hiive && e in window.nfdUIAnalytics.hiive,
      E = async (e) => {
        if (!((e) => e instanceof l)(e) || !O(e.namespace)) return !1;
        const t = e.namespace;
        delete e.namespace;
        const r = (0, u.select)(R).getHiiveSingleUrl(t);
        if (!r) return !1;
        try {
          await P()({ url: r, method: "POST", data: e });
        } catch (e) {
          return console.error(e), !1;
        }
      },
      T = window.wp.i18n;
    var H = r(955),
      k = r.n(H),
      x = r(196),
      M = (0, x.createContext)(null),
      D = (0, x.createContext)(null),
      Z = r(331),
      U = r(131);
    function B(e) {
      return (
        (B =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        B(e)
      );
    }
    function N() {
      return (function (e) {
        if (
          "object" ===
            ("undefined" == typeof document ? "undefined" : B(document)) &&
          "string" == typeof document.cookie
        )
          for (
            var t = "".concat("_ALGOLIA", "="),
              r = document.cookie.split(";"),
              n = 0;
            n < r.length;
            n++
          ) {
            for (var i = r[n]; " " === i.charAt(0); ) i = i.substring(1);
            if (0 === i.indexOf(t)) return i.substring(t.length, i.length);
          }
      })();
    }
    function z(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { fallback: function () {} },
        r = t.fallback;
      return "undefined" == typeof window ? r() : e({ window });
    }
    function G() {}
    function F(e) {
      if (e.transporter) {
        var t = e.transporter,
          r = t.headers,
          n = t.queryParameters,
          i = "x-algolia-application-id",
          a = "x-algolia-api-key";
        return [r[i] || n[i], r[a] || n[a]];
      }
      return [e.applicationID, e.apiKey];
    }
    function Q(e, t) {
      for (var r, n = 0; n < e.length; n++) if (t((r = e[n]), n, e)) return r;
    }
    function W(e) {
      return (
        (W =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        W(e)
      );
    }
    function C(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function X(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? C(Object(r), !0).forEach(function (t) {
              J(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : C(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function J(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== W(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== W(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === W(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function V(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var r =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != r) {
            var n,
              i,
              _x,
              a,
              c = [],
              _n = !0,
              s = !1;
            try {
              if (((_x = (r = r.call(e)).next), 0 === t)) {
                if (Object(r) !== r) return;
                _n = !1;
              } else
                for (
                  ;
                  !(_n = (n = _x.call(r)).done) &&
                  (c.push(n.value), c.length !== t);
                  _n = !0
                );
            } catch (e) {
              (s = !0), (i = e);
            } finally {
              try {
                if (
                  !_n &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (s) throw i;
              }
            }
            return c;
          }
        })(e, t) ||
        Y(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function L(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return q(e);
        })(e) ||
        (function (e) {
          if (
            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        Y(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Y(e, t) {
      if (e) {
        if ("string" == typeof e) return q(e, t);
        var r = Object.prototype.toString.call(e).slice(8, -1);
        return (
          "Object" === r && e.constructor && (r = e.constructor.name),
          "Map" === r || "Set" === r
            ? Array.from(e)
            : "Arguments" === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? q(e, t)
            : void 0
        );
      }
    }
    function q(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    var K = "2.6.0",
      _ = "https://cdn.jsdelivr.net/npm/search-insights@".concat(
        K,
        "/dist/search-insights.min.js"
      );
    function $(e) {
      var t = V((e.version || "").split(".").map(Number), 2),
        r = t[0],
        n = t[1];
      return r >= 3 || (2 === r && n >= 6) || (1 === r && n >= 10);
    }
    function ee(e, t, r) {
      var n = t.getHelper();
      return {
        uiState: r,
        helper: n,
        parent: t,
        instantSearchInstance: e,
        state: n.state,
        renderState: e.renderState,
        templatesConfig: e.templatesConfig,
        createURL: t.createURL,
        scopedResults: [],
        searchMetadata: { isSearchStalled: "stalled" === e.status },
        status: e.status,
        error: e.error,
      };
    }
    function te(e, t) {
      var r = t.getResults();
      return {
        helper: t.getHelper(),
        parent: t,
        instantSearchInstance: e,
        results: r,
        scopedResults: t.getScopedResults(),
        state: r._state,
        renderState: e.renderState,
        templatesConfig: e.templatesConfig,
        createURL: t.createURL,
        searchMetadata: { isSearchStalled: "stalled" === e.status },
        status: e.status,
        error: e.error,
      };
    }
    function re(e, t, r) {
      var n = ee(t, t.mainIndex, t._initialUiState);
      e.forEach(function (e) {
        var i = {};
        if (e.getWidgetRenderState) {
          var a = e.getWidgetRenderState(n);
          a && a.widgetParams && (i = a.widgetParams);
        }
        var c = Object.keys(i).filter(function (e) {
          return void 0 !== i[e];
        });
        r.widgets.push({
          type: e.$$type,
          widgetType: e.$$widgetType,
          params: c,
        }),
          "ais.index" === e.$$type && re(e.getWidgets(), t, r);
      });
    }
    var ne = r(368);
    function ie(e) {
      return (
        (ie =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        ie(e)
      );
    }
    function ae(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, se(n.key), n);
      }
    }
    function ce(e, t, r) {
      return (
        (t = se(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function se(e) {
      var t = (function (e, t) {
        if ("object" !== ie(e) || null === e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, "string");
          if ("object" !== ie(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" === ie(t) ? t : String(t);
    }
    var oe = function (e) {
        e && (window.document.title = e);
      },
      ue = (function () {
        function e(t) {
          var r = this,
            n = t.windowTitle,
            i = t.writeDelay,
            a = void 0 === i ? 400 : i,
            c = t.createURL,
            s = t.parseURL,
            o = t.getLocation,
            u = t.start,
            l = t.dispose,
            f = t.push;
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            ce(this, "$$type", "ais.browser"),
            ce(this, "windowTitle", void 0),
            ce(this, "writeDelay", void 0),
            ce(this, "_createURL", void 0),
            ce(this, "parseURL", void 0),
            ce(this, "getLocation", void 0),
            ce(this, "writeTimer", void 0),
            ce(this, "inPopState", !1),
            ce(this, "isDisposed", !1),
            ce(this, "latestAcknowledgedHistory", 0),
            ce(this, "_start", void 0),
            ce(this, "_dispose", void 0),
            ce(this, "_push", void 0),
            (this.windowTitle = n),
            (this.writeTimer = void 0),
            (this.writeDelay = a),
            (this._createURL = c),
            (this.parseURL = s),
            (this.getLocation = o),
            (this._start = u),
            (this._dispose = l),
            (this._push = f),
            z(function (e) {
              var t = e.window,
                n = r.windowTitle && r.windowTitle(r.read());
              oe(n), (r.latestAcknowledgedHistory = t.history.length);
            });
        }
        var t, r;
        return (
          (t = e),
          (r = [
            {
              key: "read",
              value: function () {
                return this.parseURL({
                  qsModule: ne,
                  location: this.getLocation(),
                });
              },
            },
            {
              key: "write",
              value: function (e) {
                var t = this;
                z(function (r) {
                  var n = r.window,
                    i = t.createURL(e),
                    a = t.windowTitle && t.windowTitle(e);
                  t.writeTimer && clearTimeout(t.writeTimer),
                    (t.writeTimer = setTimeout(function () {
                      oe(a),
                        t.shouldWrite(i) &&
                          (t._push
                            ? t._push(i)
                            : n.history.pushState(e, a || "", i),
                          (t.latestAcknowledgedHistory = n.history.length)),
                        (t.inPopState = !1),
                        (t.writeTimer = void 0);
                    }, t.writeDelay));
                });
              },
            },
            {
              key: "onUpdate",
              value: function (e) {
                var t = this;
                this._start &&
                  this._start(function () {
                    e(t.read());
                  }),
                  (this._onPopState = function () {
                    t.writeTimer &&
                      (clearTimeout(t.writeTimer), (t.writeTimer = void 0)),
                      (t.inPopState = !0),
                      e(t.read());
                  }),
                  z(function (e) {
                    e.window.addEventListener("popstate", t._onPopState);
                  });
              },
            },
            {
              key: "createURL",
              value: function (e) {
                return this._createURL({
                  qsModule: ne,
                  routeState: e,
                  location: this.getLocation(),
                });
              },
            },
            {
              key: "dispose",
              value: function () {
                var e = this;
                this._dispose && this._dispose(),
                  (this.isDisposed = !0),
                  z(function (t) {
                    var r = t.window;
                    e._onPopState &&
                      r.removeEventListener("popstate", e._onPopState);
                  }),
                  this.writeTimer && clearTimeout(this.writeTimer),
                  this.write({});
              },
            },
            {
              key: "start",
              value: function () {
                this.isDisposed = !1;
              },
            },
            {
              key: "shouldWrite",
              value: function (e) {
                var t = this;
                return z(function (r) {
                  var n = r.window,
                    i = !(
                      t.isDisposed &&
                      t.latestAcknowledgedHistory !== n.history.length
                    );
                  return !t.inPopState && i && e !== n.location.href;
                });
              },
            },
          ]) && ae(t.prototype, r),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e
        );
      })();
    function le() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.createURL,
        r =
          void 0 === t
            ? function (e) {
                var t = e.qsModule,
                  r = e.routeState,
                  n = e.location,
                  i = n.protocol,
                  a = n.hostname,
                  c = n.port,
                  s = void 0 === c ? "" : c,
                  o = n.pathname,
                  u = n.hash,
                  l = t.stringify(r),
                  f = "" === s ? "" : ":".concat(s);
                return l
                  ? ""
                      .concat(i, "//")
                      .concat(a)
                      .concat(f)
                      .concat(o, "?")
                      .concat(l)
                      .concat(u)
                  : "".concat(i, "//").concat(a).concat(f).concat(o).concat(u);
              }
            : t,
        n = e.parseURL,
        i =
          void 0 === n
            ? function (e) {
                var t = e.qsModule,
                  r = e.location;
                return t.parse(r.search.slice(1), { arrayLimit: 99 });
              }
            : n,
        a = e.writeDelay,
        c = void 0 === a ? 400 : a,
        s = e.windowTitle,
        o = e.getLocation,
        u =
          void 0 === o
            ? function () {
                return z(
                  function (e) {
                    return e.window.location;
                  },
                  {
                    fallback: function () {
                      throw new Error(
                        "You need to provide `getLocation` to the `history` router in environments where `window` does not exist."
                      );
                    },
                  }
                );
              }
            : o,
        l = e.start,
        f = e.dispose,
        h = e.push;
      return new ue({
        createURL: r,
        parseURL: i,
        writeDelay: c,
        windowTitle: s,
        getLocation: u,
        start: l,
        dispose: f,
        push: h,
      });
    }
    function fe(e) {
      return (
        (fe =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        fe(e)
      );
    }
    var he = ["configure"];
    function de(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function pe(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? de(Object(r), !0).forEach(function (t) {
              me(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : de(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function me(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== fe(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== fe(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === fe(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function ge(e) {
      return (
        e.configure,
        (function (e, t) {
          if (null == e) return {};
          var r,
            n,
            i = (function (e, t) {
              if (null == e) return {};
              var r,
                n,
                i = {},
                a = Object.keys(e);
              for (n = 0; n < a.length; n++)
                (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
              return i;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]),
                t.indexOf(r) >= 0 ||
                  (Object.prototype.propertyIsEnumerable.call(e, r) &&
                    (i[r] = e[r]));
          }
          return i;
        })(e, he)
      );
    }
    function ye() {
      return {
        $$type: "ais.simple",
        stateToRoute: function (e) {
          return Object.keys(e).reduce(function (t, r) {
            return pe(pe({}, t), {}, me({}, r, ge(e[r])));
          }, {});
        },
        routeToState: function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return Object.keys(e).reduce(function (t, r) {
            return pe(pe({}, t), {}, me({}, r, ge(e[r])));
          }, {});
        },
      };
    }
    function Ae(e) {
      return e !== Object(e);
    }
    function be(e, t) {
      if (e === t) return !0;
      if (Ae(e) || Ae(t) || "function" == typeof e || "function" == typeof t)
        return e === t;
      if (Object.keys(e).length !== Object.keys(t).length) return !1;
      for (var r = 0, n = Object.keys(e); r < n.length; r++) {
        var i = n[r];
        if (!(i in t)) return !1;
        if (!be(e[i], t[i])) return !1;
      }
      return !0;
    }
    function ve(e) {
      return (
        (ve =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        ve(e)
      );
    }
    function Ie(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Se(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ie(Object(r), !0).forEach(function (t) {
              we(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Ie(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function we(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== ve(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== ve(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === ve(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function Re(e) {
      var t = e.name,
        r = e.connector;
      return [
        "https://www.algolia.com/doc/api-reference/widgets/",
        t,
        "/js/",
        void 0 !== r && r ? "#connector" : "",
      ].join("");
    }
    function je() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      var n = t
        .map(function (e) {
          return Re(e);
        })
        .join(", ");
      return function (e) {
        return [e, "See documentation: ".concat(n)]
          .filter(Boolean)
          .join("\n\n");
      };
    }
    function Pe(e) {
      return "ais.index" === e.$$type;
    }
    function Oe(e) {
      return (
        (Oe =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Oe(e)
      );
    }
    var Ee = [
      "facets",
      "disjunctiveFacets",
      "facetsRefinements",
      "facetsExcludes",
      "disjunctiveFacetsRefinements",
      "numericRefinements",
      "tagRefinements",
      "hierarchicalFacets",
      "hierarchicalFacetsRefinements",
      "ruleContexts",
    ];
    function Te(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function He(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Te(Object(r), !0).forEach(function (t) {
              ke(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Te(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function ke(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== Oe(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== Oe(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === Oe(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    var xe = function (e, t) {
        t.facets,
          t.disjunctiveFacets,
          t.facetsRefinements,
          t.facetsExcludes,
          t.disjunctiveFacetsRefinements,
          t.numericRefinements,
          t.tagRefinements,
          t.hierarchicalFacets,
          t.hierarchicalFacetsRefinements,
          t.ruleContexts;
        var r = (function (e, t) {
          if (null == e) return {};
          var r,
            n,
            i = (function (e, t) {
              if (null == e) return {};
              var r,
                n,
                i = {},
                a = Object.keys(e);
              for (n = 0; n < a.length; n++)
                (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
              return i;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]),
                t.indexOf(r) >= 0 ||
                  (Object.prototype.propertyIsEnumerable.call(e, r) &&
                    (i[r] = e[r]));
          }
          return i;
        })(t, Ee);
        return e.setQueryParameters(r);
      },
      Me = function (e, t) {
        return t.facets.reduce(function (e, t) {
          return e.addFacet(t);
        }, e);
      },
      De = function (e, t) {
        return t.disjunctiveFacets.reduce(function (e, t) {
          return e.addDisjunctiveFacet(t);
        }, e);
      },
      Ze = function (e, t) {
        return e.setQueryParameters({
          hierarchicalFacets: t.hierarchicalFacets.reduce(function (e, t) {
            var r = (function (e, r) {
              if (!Array.isArray(e)) return -1;
              for (var n = 0; n < e.length; n++)
                if (e[n].name === t.name) return n;
              return -1;
            })(e);
            if (-1 === r) return e.concat(t);
            var n = e.slice();
            return n.splice(r, 1, t), n;
          }, e.hierarchicalFacets),
        });
      },
      Ue = function (e, t) {
        return t.tagRefinements.reduce(function (e, t) {
          return e.addTagRefinement(t);
        }, e);
      },
      Be = function (e, t) {
        return e.setQueryParameters({
          facetsRefinements: He(
            He({}, e.facetsRefinements),
            t.facetsRefinements
          ),
        });
      },
      Ne = function (e, t) {
        return e.setQueryParameters({
          facetsExcludes: He(He({}, e.facetsExcludes), t.facetsExcludes),
        });
      },
      ze = function (e, t) {
        return e.setQueryParameters({
          disjunctiveFacetsRefinements: He(
            He({}, e.disjunctiveFacetsRefinements),
            t.disjunctiveFacetsRefinements
          ),
        });
      },
      Ge = function (e, t) {
        return e.setQueryParameters({
          numericRefinements: He(
            He({}, e.numericRefinements),
            t.numericRefinements
          ),
        });
      },
      Fe = function (e, t) {
        return e.setQueryParameters({
          hierarchicalFacetsRefinements: He(
            He({}, e.hierarchicalFacetsRefinements),
            t.hierarchicalFacetsRefinements
          ),
        });
      },
      Qe = function (e, t) {
        var r = []
          .concat(e.ruleContexts)
          .concat(t.ruleContexts)
          .filter(Boolean)
          .filter(function (e, t, r) {
            return r.indexOf(e) === t;
          });
        return r.length > 0 ? e.setQueryParameters({ ruleContexts: r }) : e;
      },
      We = function () {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return t.reduce(function (e, t) {
          var r = Fe(e, t),
            n = Ze(r, t),
            i = Ue(n, t),
            a = Ge(i, t),
            c = ze(a, t),
            s = Ne(c, t),
            o = Be(s, t),
            u = De(o, t),
            l = Qe(u, t),
            f = Me(l, t);
          return xe(f, t);
        });
      };
    function Ce(e) {
      return (
        (Ce =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Ce(e)
      );
    }
    var Xe = ["initialSearchParameters"];
    function Je(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Ve(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Je(Object(r), !0).forEach(function (t) {
              Le(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Je(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function Le(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== Ce(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== Ce(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === Ce(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function Ye(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return qe(e);
        })(e) ||
        (function (e) {
          if (
            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return qe(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? qe(e, t)
                : void 0
            );
          }
        })(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function qe(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    var Ke = je({ name: "index-widget" });
    function _e(e, t) {
      var r = t.state,
        n = t.isPageReset,
        i = t._uiState;
      r !== e.state &&
        ((e.state = r),
        e.emit("change", {
          state: e.state,
          results: e.lastResults,
          isPageReset: n,
          _uiState: i,
        }));
    }
    function $e(e, t) {
      var r =
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return e.reduce(function (e, r) {
        return Pe(r)
          ? e
          : r.getWidgetUiState || r.getWidgetState
          ? r.getWidgetUiState
            ? r.getWidgetUiState(e, t)
            : r.getWidgetState(e, t)
          : e;
      }, r);
    }
    function et(e, t) {
      var r = t.initialSearchParameters,
        n = (function (e, t) {
          if (null == e) return {};
          var r,
            n,
            i = (function (e, t) {
              if (null == e) return {};
              var r,
                n,
                i = {},
                a = Object.keys(e);
              for (n = 0; n < a.length; n++)
                (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
              return i;
            })(e, t);
          if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            for (n = 0; n < a.length; n++)
              (r = a[n]),
                t.indexOf(r) >= 0 ||
                  (Object.prototype.propertyIsEnumerable.call(e, r) &&
                    (i[r] = e[r]));
          }
          return i;
        })(t, Xe);
      return e
        .filter(function (e) {
          return !Pe(e);
        })
        .reduce(function (e, t) {
          return t.getWidgetSearchParameters
            ? t.getWidgetSearchParameters(e, n)
            : e;
        }, r);
    }
    function tt(e) {
      var t = e.filter(Pe);
      0 !== t.length &&
        t.forEach(function (e) {
          var t = e.getHelper();
          _e(t, { state: t.state.resetPage(), isPageReset: !0 }),
            tt(e.getWidgets());
        });
    }
    function rt(e) {
      return e.filter(Pe).reduce(function (e, t) {
        return e.concat.apply(
          e,
          [
            {
              indexId: t.getIndexId(),
              results: t.getResults(),
              helper: t.getHelper(),
            },
          ].concat(Ye(rt(t.getWidgets())))
        );
      }, []);
    }
    const nt = function (e) {
      if (void 0 === e || void 0 === e.indexName)
        throw new Error(Ke("The `indexName` option is required."));
      var t = e.indexName,
        r = e.indexId,
        n = void 0 === r ? t : r,
        i = [],
        a = {},
        c = null,
        s = null,
        o = null,
        u = null,
        l = null;
      return {
        $$type: "ais.index",
        $$widgetType: "ais.index",
        getIndexName: function () {
          return t;
        },
        getIndexId: function () {
          return n;
        },
        getHelper: function () {
          return o;
        },
        getResults: function () {
          var e;
          return null !== (e = u) && void 0 !== e && e.lastResults
            ? ((u.lastResults._state = o.state), u.lastResults)
            : null;
        },
        getPreviousState: function () {
          return l;
        },
        getScopedResults: function () {
          var e = this.getParent();
          return rt(e ? e.getWidgets() : [this]);
        },
        getParent: function () {
          return s;
        },
        createURL: function (e) {
          return c._createURL(
            Le({}, n, $e(i, { searchParameters: e, helper: o }))
          );
        },
        getWidgets: function () {
          return i;
        },
        addWidgets: function (e) {
          var t = this;
          if (!Array.isArray(e))
            throw new Error(
              Ke("The `addWidgets` method expects an array of widgets.")
            );
          if (
            e.some(function (e) {
              return (
                "function" != typeof e.init && "function" != typeof e.render
              );
            })
          )
            throw new Error(
              Ke(
                "The widget definition expects a `render` and/or an `init` method."
              )
            );
          return (
            (i = i.concat(e)),
            c &&
              Boolean(e.length) &&
              (_e(o, {
                state: et(i, { uiState: a, initialSearchParameters: o.state }),
                _uiState: a,
              }),
              e.forEach(function (e) {
                e.getRenderState &&
                  it({
                    renderState: e.getRenderState(
                      c.renderState[t.getIndexId()] || {},
                      ee(c, t, c._initialUiState)
                    ),
                    instantSearchInstance: c,
                    parent: t,
                  });
              }),
              e.forEach(function (e) {
                e.init && e.init(ee(c, t, c._initialUiState));
              }),
              c.scheduleSearch()),
            this
          );
        },
        removeWidgets: function (e) {
          var t = this;
          if (!Array.isArray(e))
            throw new Error(
              Ke("The `removeWidgets` method expects an array of widgets.")
            );
          if (
            e.some(function (e) {
              return "function" != typeof e.dispose;
            })
          )
            throw new Error(
              Ke("The widget definition expects a `dispose` method.")
            );
          if (
            ((i = i.filter(function (t) {
              return -1 === e.indexOf(t);
            })),
            c && Boolean(e.length))
          ) {
            var r = e.reduce(function (e, r) {
              return r.dispose({ helper: o, state: e, parent: t }) || e;
            }, o.state);
            (a = $e(i, { searchParameters: r, helper: o })),
              o.setState(et(i, { uiState: a, initialSearchParameters: r })),
              i.length && c.scheduleSearch();
          }
          return this;
        },
        init: function (e) {
          var r,
            f = this,
            h = e.instantSearchInstance,
            d = e.parent,
            p = e.uiState;
          if (null === o) {
            (c = h), (s = d), (a = p[n] || {});
            var m = h.mainHelper,
              g = et(i, {
                uiState: a,
                initialSearchParameters: new U.SearchParameters({ index: t }),
              });
            ((o = U({}, g.index, g)).search = function () {
              return h.onStateChange
                ? (h.onStateChange({
                    uiState: h.mainIndex.getWidgetUiState({}),
                    setUiState: function (e) {
                      return h.setUiState(e, !1);
                    },
                  }),
                  m)
                : m.search();
            }),
              (o.searchWithoutTriggeringOnStateChange = function () {
                return m.search();
              }),
              (o.searchForFacetValues = function (e, t, r, n) {
                var i = o.state.setQueryParameters(n);
                return m.searchForFacetValues(e, t, r, i);
              }),
              (u = m.derive(function () {
                return We.apply(
                  void 0,
                  Ye(
                    (function (e) {
                      for (
                        var t = e.getParent(), r = [e.getHelper().state];
                        null !== t;

                      )
                        (r = [t.getHelper().state].concat(r)),
                          (t = t.getParent());
                      return r;
                    })(f)
                  )
                );
              }));
            var y =
              null === (r = h._initialResults) || void 0 === r
                ? void 0
                : r[this.getIndexId()];
            if (y) {
              var A = new U.SearchResults(
                new U.SearchParameters(y.state),
                y.results
              );
              (u.lastResults = A), (o.lastResults = A);
            }
            o.on("change", function (e) {
              e.isPageReset && tt(i);
            }),
              u.on("search", function () {
                h.scheduleStalledRender();
              }),
              u.on("result", function (e) {
                var t = e.results;
                h.scheduleRender(), (o.lastResults = t), (l = t._state);
              }),
              i.forEach(function (e) {
                e.getRenderState &&
                  it({
                    renderState: e.getRenderState(
                      h.renderState[f.getIndexId()] || {},
                      ee(h, f, p)
                    ),
                    instantSearchInstance: h,
                    parent: f,
                  });
              }),
              i.forEach(function (e) {
                e.init && e.init(ee(h, f, p));
              }),
              o.on("change", function (e) {
                var t = e.state,
                  r = e._uiState;
                (a = $e(i, { searchParameters: t, helper: o }, r || {})),
                  h.onStateChange || h.onInternalStateChange();
              }),
              y && h.scheduleRender();
          }
        },
        render: function (e) {
          var t = this,
            r = e.instantSearchInstance;
          this.getResults() &&
            ("error" !== r.status ||
              r.mainHelper.hasPendingRequests() ||
              o.setState(l),
            i.forEach(function (e) {
              e.getRenderState &&
                it({
                  renderState: e.getRenderState(
                    r.renderState[t.getIndexId()] || {},
                    te(r, t)
                  ),
                  instantSearchInstance: r,
                  parent: t,
                });
            }),
            i.forEach(function (e) {
              e.render && e.render(te(r, t));
            }));
        },
        dispose: function () {
          var e,
            t,
            r = this;
          i.forEach(function (e) {
            e.dispose && e.dispose({ helper: o, state: o.state, parent: r });
          }),
            (c = null),
            (s = null),
            null === (e = o) || void 0 === e || e.removeAllListeners(),
            (o = null),
            null === (t = u) || void 0 === t || t.detach(),
            (u = null);
        },
        getWidgetUiState: function (e) {
          return i.filter(Pe).reduce(function (e, t) {
            return t.getWidgetUiState(e);
          }, Ve(Ve({}, e), {}, Le({}, n, Ve(Ve({}, e[n]), a))));
        },
        getWidgetState: function (e) {
          return this.getWidgetUiState(e);
        },
        getWidgetSearchParameters: function (e, t) {
          var r = t.uiState;
          return et(i, { uiState: r, initialSearchParameters: e });
        },
        refreshUiState: function () {
          a = $e(
            i,
            {
              searchParameters: this.getHelper().state,
              helper: this.getHelper(),
            },
            a
          );
        },
        setIndexUiState: function (e) {
          var t = "function" == typeof e ? e(a) : e;
          c.setUiState(function (e) {
            return Ve(Ve({}, e), {}, Le({}, n, t));
          });
        },
      };
    };
    function it(e) {
      var t = e.renderState,
        r = e.instantSearchInstance,
        n = e.parent,
        i = n ? n.getIndexId() : r.mainIndex.getIndexId();
      r.renderState = Ve(
        Ve({}, r.renderState),
        {},
        Le({}, i, Ve(Ve({}, r.renderState[i]), t))
      );
    }
    var at = function (e) {
      return function () {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          r = t.descendantName,
          n = t.modifierName,
          i = r ? "-".concat(r) : "",
          a = n ? "--".concat(n) : "";
        return "".concat("ais", "-").concat(e).concat(i).concat(a);
      };
    };
    function ct(e, t) {
      return (Array.isArray(t) ? t : t.split(".")).reduce(function (e, t) {
        return e && e[t];
      }, e);
    }
    var st = "<mark>",
      ot = "</mark>",
      ut = at("Highlight");
    function lt(e) {
      var t = st,
        r = ot;
      return e
        .map(function (e) {
          return e.isHighlighted ? t + e.value + r : e.value;
        })
        .join("");
    }
    RegExp(/[&<>"']/g.source);
    var ft = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      },
      ht = /&(amp|quot|lt|gt|#39);/g,
      dt = RegExp(ht.source),
      pt = new RegExp(/\w/i);
    function mt(e, t) {
      var r,
        n,
        i,
        a = e[t],
        c =
          (null === (r = e[t + 1]) || void 0 === r
            ? void 0
            : r.isHighlighted) || !0,
        s =
          (null === (n = e[t - 1]) || void 0 === n
            ? void 0
            : n.isHighlighted) || !0;
      return pt.test(
        (i = a.value) && dt.test(i)
          ? i.replace(ht, function (e) {
              return ft[e];
            })
          : i
      ) || s !== c
        ? a.isHighlighted
        : s;
    }
    function gt(e) {
      return (
        (gt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        gt(e)
      );
    }
    function yt(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function At(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? yt(Object(r), !0).forEach(function (t) {
              bt(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : yt(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function bt(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== gt(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== gt(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === gt(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function vt(e) {
      return e.some(function (e) {
        return e.isHighlighted;
      })
        ? e.map(function (t, r) {
            return At(At({}, t), {}, { isHighlighted: !mt(e, r) });
          })
        : e.map(function (e) {
            return At(At({}, e), {}, { isHighlighted: !1 });
          });
    }
    function It(e) {
      var t = ot,
        r = st,
        n = e.split(r),
        i = n.shift(),
        a = i ? [{ value: i, isHighlighted: !1 }] : [];
      return (
        n.forEach(function (e) {
          var r = e.split(t);
          a.push({ value: r[0], isHighlighted: !0 }),
            "" !== r[1] && a.push({ value: r[1], isHighlighted: !1 });
        }),
        a
      );
    }
    var St = at("ReverseHighlight"),
      wt = at("Snippet"),
      Rt = at("ReverseSnippet");
    function jt(e) {
      return (
        (jt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        jt(e)
      );
    }
    function Pt(e) {
      return (
        (Pt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Pt(e)
      );
    }
    function Ot(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Et(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ot(Object(r), !0).forEach(function (t) {
              Tt(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Ot(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function Tt(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== Pt(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== Pt(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === Pt(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function Ht(e) {
      var t = e.numberLocale;
      return {
        formatNumber: function (e, r) {
          return (function (e, t) {
            return e.toLocaleString(t);
          })(Number(r(e)), t);
        },
        highlight: function (e, t) {
          try {
            return t(
              (function (e) {
                var t = e.attribute,
                  r = e.highlightedTagName,
                  n = void 0 === r ? "mark" : r,
                  i = e.hit,
                  a = e.cssClasses,
                  c = void 0 === a ? {} : a,
                  s = (ct(i._highlightResult, t) || {}).value,
                  o = void 0 === s ? "" : s,
                  u =
                    ut({ descendantName: "highlighted" }) +
                    (c.highlighted ? " ".concat(c.highlighted) : "");
                return o
                  .replace(
                    new RegExp(st, "g"),
                    "<".concat(n, ' class="').concat(u, '">')
                  )
                  .replace(new RegExp(ot, "g"), "</".concat(n, ">"));
              })(Et(Et({}, JSON.parse(e)), {}, { hit: this }))
            );
          } catch (e) {
            throw new Error(
              '\nThe highlight helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }'
            );
          }
        },
        reverseHighlight: function (e, t) {
          try {
            return t(
              (function (e) {
                var t = e.attribute,
                  r = e.highlightedTagName,
                  n = void 0 === r ? "mark" : r,
                  i = e.hit,
                  a = e.cssClasses,
                  c = void 0 === a ? {} : a,
                  s = (ct(i._highlightResult, t) || {}).value,
                  o = void 0 === s ? "" : s,
                  u =
                    St({ descendantName: "highlighted" }) +
                    (c.highlighted ? " ".concat(c.highlighted) : "");
                return lt(vt(It(o)))
                  .replace(
                    new RegExp(st, "g"),
                    "<".concat(n, ' class="').concat(u, '">')
                  )
                  .replace(new RegExp(ot, "g"), "</".concat(n, ">"));
              })(Et(Et({}, JSON.parse(e)), {}, { hit: this }))
            );
          } catch (e) {
            throw new Error(
              '\n  The reverseHighlight helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }'
            );
          }
        },
        snippet: function (e, t) {
          try {
            return t(
              (function (e) {
                var t = e.attribute,
                  r = e.highlightedTagName,
                  n = void 0 === r ? "mark" : r,
                  i = e.hit,
                  a = e.cssClasses,
                  c = void 0 === a ? {} : a,
                  s = (ct(i._snippetResult, t) || {}).value,
                  o = void 0 === s ? "" : s,
                  u =
                    wt({ descendantName: "highlighted" }) +
                    (c.highlighted ? " ".concat(c.highlighted) : "");
                return o
                  .replace(
                    new RegExp(st, "g"),
                    "<".concat(n, ' class="').concat(u, '">')
                  )
                  .replace(new RegExp(ot, "g"), "</".concat(n, ">"));
              })(Et(Et({}, JSON.parse(e)), {}, { hit: this }))
            );
          } catch (e) {
            throw new Error(
              '\nThe snippet helper expects a JSON object of the format:\n{ "attribute": "name", "highlightedTagName": "mark" }'
            );
          }
        },
        reverseSnippet: function (e, t) {
          try {
            return t(
              (function (e) {
                var t = e.attribute,
                  r = e.highlightedTagName,
                  n = void 0 === r ? "mark" : r,
                  i = e.hit,
                  a = e.cssClasses,
                  c = void 0 === a ? {} : a,
                  s = (ct(i._snippetResult, t) || {}).value,
                  o = void 0 === s ? "" : s,
                  u =
                    Rt({ descendantName: "highlighted" }) +
                    (c.highlighted ? " ".concat(c.highlighted) : "");
                return lt(vt(It(o)))
                  .replace(
                    new RegExp(st, "g"),
                    "<".concat(n, ' class="').concat(u, '">')
                  )
                  .replace(new RegExp(ot, "g"), "</".concat(n, ">"));
              })(Et(Et({}, JSON.parse(e)), {}, { hit: this }))
            );
          } catch (e) {
            throw new Error(
              '\n  The reverseSnippet helper expects a JSON object of the format:\n  { "attribute": "name", "highlightedTagName": "mark" }'
            );
          }
        },
        insights: function (e, t) {
          try {
            var r = JSON.parse(e),
              n = r.method,
              i = r.payload;
            return t(
              (function (e, t) {
                return (function (e) {
                  var t,
                    r = e.method,
                    n = e.payload;
                  if ("object" !== jt(n))
                    throw new Error(
                      "The insights helper expects the payload to be an object."
                    );
                  try {
                    t = (function (e) {
                      return btoa(encodeURIComponent(JSON.stringify(e)));
                    })(n);
                  } catch (e) {
                    throw new Error(
                      "Could not JSON serialize the payload object."
                    );
                  }
                  return 'data-insights-method="'
                    .concat(r, '" data-insights-payload="')
                    .concat(t, '"');
                })({ method: e, payload: t });
              })(n, Et({ objectIDs: [this.objectID] }, i))
            );
          } catch (e) {
            throw new Error(
              '\nThe insights helper expects a JSON object of the format:\n{ "method": "method-name", "payload": { "eventName": "name of the event" } }'
            );
          }
        },
      };
    }
    var kt = Promise.resolve();
    function xt(e) {
      var t = null,
        r = !1,
        n = function () {
          for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
            i[a] = arguments[a];
          null === t &&
            (t = kt.then(function () {
              (t = null), r ? (r = !1) : e.apply(void 0, i);
            }));
        };
      return (
        (n.wait = function () {
          if (null === t)
            throw new Error(
              "The deferred function should be called before calling `wait()`"
            );
          return t;
        }),
        (n.cancel = function () {
          null !== t && (r = !0);
        }),
        n
      );
    }
    function Mt(e, t) {
      var r = e[t.getIndexId()] || {};
      t
        .getHelper()
        .setState(
          t.getWidgetSearchParameters(t.getHelper().state, { uiState: r })
        ),
        t
          .getWidgets()
          .filter(Pe)
          .forEach(function (t) {
            return Mt(e, t);
          });
    }
    function Dt(e) {
      return (
        (Dt =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Dt(e)
      );
    }
    function Zt(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Ut(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Zt(Object(r), !0).forEach(function (t) {
              Qt(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Zt(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function Bt(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, Wt(n.key), n);
      }
    }
    function Nt(e, t) {
      return (
        (Nt = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e;
            }),
        Nt(e, t)
      );
    }
    function zt(e, t) {
      if (t && ("object" === Dt(t) || "function" == typeof t)) return t;
      if (void 0 !== t)
        throw new TypeError(
          "Derived constructors may only return object or undefined"
        );
      return Gt(e);
    }
    function Gt(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    }
    function Ft(e) {
      return (
        (Ft = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
        Ft(e)
      );
    }
    function Qt(e, t, r) {
      return (
        (t = Wt(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function Wt(e) {
      var t = (function (e, t) {
        if ("object" !== Dt(e) || null === e) return e;
        var r = e[Symbol.toPrimitive];
        if (void 0 !== r) {
          var n = r.call(e, "string");
          if ("object" !== Dt(n)) return n;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(e);
      })(e);
      return "symbol" === Dt(t) ? t : String(t);
    }
    var Ct = je({ name: "instantsearch" });
    function Xt() {
      return "#";
    }
    const Jt = (function (e) {
      !(function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          t && Nt(e, t);
      })(c, e);
      var t,
        r,
        n,
        i,
        a =
          ((n = c),
          (i = (function () {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
              return (
                Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                ),
                !0
              );
            } catch (e) {
              return !1;
            }
          })()),
          function () {
            var e,
              t = Ft(n);
            if (i) {
              var r = Ft(this).constructor;
              e = Reflect.construct(t, arguments, r);
            } else e = t.apply(this, arguments);
            return zt(this, e);
          });
      function c(e) {
        var t;
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, c),
          Qt(Gt((t = a.call(this))), "client", void 0),
          Qt(Gt(t), "indexName", void 0),
          Qt(Gt(t), "insightsClient", void 0),
          Qt(Gt(t), "onStateChange", null),
          Qt(Gt(t), "helper", void 0),
          Qt(Gt(t), "mainHelper", void 0),
          Qt(Gt(t), "mainIndex", void 0),
          Qt(Gt(t), "started", void 0),
          Qt(Gt(t), "templatesConfig", void 0),
          Qt(Gt(t), "renderState", {}),
          Qt(Gt(t), "_stalledSearchDelay", void 0),
          Qt(Gt(t), "_searchStalledTimer", void 0),
          Qt(Gt(t), "_initialUiState", void 0),
          Qt(Gt(t), "_initialResults", void 0),
          Qt(Gt(t), "_createURL", void 0),
          Qt(Gt(t), "_searchFunction", void 0),
          Qt(Gt(t), "_mainHelperSearch", void 0),
          Qt(Gt(t), "middleware", []),
          Qt(Gt(t), "sendEventToInsights", void 0),
          Qt(Gt(t), "status", "idle"),
          Qt(Gt(t), "error", void 0),
          Qt(
            Gt(t),
            "scheduleSearch",
            xt(function () {
              t.started && t.mainHelper.search();
            })
          ),
          Qt(
            Gt(t),
            "scheduleRender",
            xt(function () {
              var e,
                r =
                  !(arguments.length > 0 && void 0 !== arguments[0]) ||
                  arguments[0];
              (null !== (e = t.mainHelper) &&
                void 0 !== e &&
                e.hasPendingRequests()) ||
                (clearTimeout(t._searchStalledTimer),
                (t._searchStalledTimer = null),
                r && ((t.status = "idle"), (t.error = void 0))),
                t.mainIndex.render({ instantSearchInstance: Gt(t) }),
                t.emit("render");
            })
          ),
          Qt(
            Gt(t),
            "onInternalStateChange",
            xt(function () {
              var e = t.mainIndex.getWidgetUiState({});
              t.middleware.forEach(function (t) {
                t.instance.onStateChange({ uiState: e });
              });
            })
          ),
          t.setMaxListeners(100);
        var r = e.indexName,
          n = void 0 === r ? null : r,
          i = e.numberLocale,
          s = e.initialUiState,
          o = void 0 === s ? {} : s,
          u = e.routing,
          l = void 0 === u ? null : u,
          f = e.insights,
          h = void 0 !== f && f,
          d = e.searchFunction,
          p = e.stalledSearchDelay,
          m = void 0 === p ? 200 : p,
          g = e.searchClient,
          y = void 0 === g ? null : g,
          A = e.insightsClient,
          b = void 0 === A ? null : A,
          v = e.onStateChange,
          I = void 0 === v ? null : v;
        if (null === n)
          throw new Error(Ct("The `indexName` option is required."));
        if (null === y)
          throw new Error(Ct("The `searchClient` option is required."));
        if ("function" != typeof y.search)
          throw new Error(
            "The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/"
          );
        if (
          ("function" == typeof y.addAlgoliaAgent &&
            y.addAlgoliaAgent("instantsearch.js (".concat("4.55.0", ")")),
          b && "function" != typeof b)
        )
          throw new Error(
            Ct("The `insightsClient` option should be a function.")
          );
        if (
          ((t.client = y),
          (t.insightsClient = b),
          (t.indexName = n),
          (t.helper = null),
          (t.mainHelper = null),
          (t.mainIndex = nt({ indexName: n })),
          (t.onStateChange = I),
          (t.started = !1),
          (t.templatesConfig = {
            helpers: Ht({ numberLocale: i }),
            compileOptions: {},
          }),
          (t._stalledSearchDelay = m),
          (t._searchStalledTimer = null),
          (t._createURL = Xt),
          (t._initialUiState = o),
          (t._initialResults = null),
          d && (t._searchFunction = d),
          (t.sendEventToInsights = G),
          l)
        ) {
          var S = "boolean" == typeof l ? {} : l;
          (S.$$internal = !0),
            t.use(
              (function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = e.router,
                  r = void 0 === t ? le() : t,
                  n = e.stateMapping,
                  i = void 0 === n ? ye() : n,
                  a = e.$$internal,
                  c = void 0 !== a && a;
                return function (e) {
                  var t = e.instantSearchInstance;
                  t._createURL = function (e) {
                    var n = Object.keys(e).reduce(function (t, r) {
                        return Se(Se({}, t), {}, we({}, r, e[r]));
                      }, t.mainIndex.getWidgetUiState({})),
                      a = i.stateToRoute(n);
                    return r.createURL(a);
                  };
                  var n = void 0,
                    a = t._initialUiState;
                  return {
                    $$type: "ais.router({router:"
                      .concat(r.$$type || "__unknown__", ", stateMapping:")
                      .concat(i.$$type || "__unknown__", "})"),
                    $$internal: c,
                    onStateChange: function (e) {
                      var t = e.uiState,
                        a = i.stateToRoute(t);
                      (void 0 !== n && be(n, a)) || (r.write(a), (n = a));
                    },
                    subscribe: function () {
                      (t._initialUiState = Se(
                        Se({}, a),
                        i.routeToState(r.read())
                      )),
                        r.onUpdate(function (e) {
                          t.setUiState(i.routeToState(e));
                        });
                    },
                    started: function () {
                      var e;
                      null === (e = r.start) || void 0 === e || e.call(r);
                    },
                    unsubscribe: function () {
                      r.dispose();
                    },
                  };
                };
              })(S)
            );
        }
        if (h) {
          var w = "boolean" == typeof h ? {} : h;
          (w.$$internal = !0),
            t.use(
              (function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = e.insightsClient,
                  r = e.insightsInitParams,
                  n = e.onEvent,
                  i = e.$$internal,
                  a = void 0 !== i && i,
                  c = t;
                t ||
                  null === t ||
                  z(function (e) {
                    var t = e.window,
                      r = t.AlgoliaAnalyticsObject || "aa";
                    "string" == typeof r && (c = t[r]),
                      c ||
                        ((t.AlgoliaAnalyticsObject = r),
                        t[r] ||
                          ((t[r] = function () {
                            t[r].queue || (t[r].queue = []);
                            for (
                              var e = arguments.length, n = new Array(e), i = 0;
                              i < e;
                              i++
                            )
                              n[i] = arguments[i];
                            t[r].queue.push(n);
                          }),
                          (t[r].version = K),
                          (t[r].shouldAddScript = !0)),
                        (c = t[r]));
                  });
                var s = c || G;
                return function (e) {
                  var t = e.instantSearchInstance,
                    i = t.middleware
                      .filter(function (e) {
                        return (
                          "ais.insights" === e.instance.$$type &&
                          e.instance.$$internal
                        );
                      })
                      .map(function (e) {
                        return e.creator;
                      });
                  t.unuse.apply(t, L(i));
                  var c,
                    o,
                    u = V(F(t.client), 2),
                    l = u[0],
                    f = u[1],
                    h = void 0,
                    d = void 0;
                  if (Array.isArray(s.queue)) {
                    var p =
                        Q(s.queue.slice().reverse(), function (e) {
                          return "setUserToken" === V(e, 1)[0];
                        }) || [],
                      m = V(p, 2);
                    h = m[1];
                  }
                  return (
                    s("getUserToken", null, function (e, t) {
                      d = t;
                    }),
                    (!r && $(s)) ||
                      s("init", X({ appId: l, apiKey: f, partial: !0 }, r)),
                    {
                      $$type: "ais.insights",
                      $$internal: a,
                      onStateChange: function () {},
                      subscribe: function () {
                        if (s.shouldAddScript) {
                          var e =
                            "[insights middleware]: could not load search-insights.js. Please load it manually following https://alg.li/insights-init";
                          try {
                            var r = document.createElement("script");
                            (r.async = !0),
                              (r.src = _),
                              (r.onerror = function () {
                                t.emit("error", new Error(e));
                              }),
                              document.body.appendChild(r),
                              (s.shouldAddScript = !1);
                          } catch (r) {
                            (s.shouldAddScript = !1),
                              t.emit("error", new Error(e));
                          }
                        }
                      },
                      started: function () {
                        s("addAlgoliaAgent", "insights-middleware"),
                          (o = t.helper),
                          (c = {
                            userToken: o.state.userToken,
                            clickAnalytics: o.state.clickAnalytics,
                          }),
                          o.overrideStateWithoutTriggeringChangeEvent(
                            X(X({}, o.state), {}, { clickAnalytics: !0 })
                          ),
                          a || t.scheduleSearch();
                        var e = function (e) {
                            if (e) {
                              var r = o.state.userToken;
                              o.overrideStateWithoutTriggeringChangeEvent(
                                X(X({}, o.state), {}, { userToken: e })
                              ),
                                r && r !== e && t.scheduleSearch();
                            }
                          },
                          r = N();
                        r && e(r),
                          d
                            ? (e(d), s("setUserToken", d))
                            : h && (e(h), s("setUserToken", h)),
                          s("onUserTokenChange", e, { immediate: !0 });
                        var i = s;
                        $(s) &&
                          (i = function (e, t) {
                            return s(e, t, {
                              headers: {
                                "X-Algolia-Application-Id": l,
                                "X-Algolia-API-Key": f,
                              },
                            });
                          }),
                          (t.sendEventToInsights = function (e) {
                            n
                              ? n(e, i)
                              : e.insightsMethod &&
                                ((e.payload.algoliaSource = ["instantsearch"]),
                                "internal" === e.eventModifier &&
                                  e.payload.algoliaSource.push(
                                    "instantsearch-internal"
                                  ),
                                i(e.insightsMethod, e.payload));
                          });
                      },
                      unsubscribe: function () {
                        s("onUserTokenChange", void 0),
                          (t.sendEventToInsights = G),
                          o &&
                            c &&
                            (o.overrideStateWithoutTriggeringChangeEvent(
                              X(X({}, o.state), c)
                            ),
                            t.scheduleSearch());
                      },
                    }
                  );
                };
              })(w)
            );
        }
        return (
          z(
            function (e) {
              var t, r;
              return (
                (null === (t = e.window.navigator) ||
                void 0 === t ||
                null === (r = t.userAgent) ||
                void 0 === r
                  ? void 0
                  : r.indexOf("Algolia Crawler")) > -1
              );
            },
            {
              fallback: function () {
                return !1;
              },
            }
          ) &&
            t.use(
              (function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = e.$$internal,
                  r = void 0 !== t && t;
                return function (e) {
                  var t = e.instantSearchInstance,
                    n = { widgets: [] },
                    i = document.createElement("meta"),
                    a = document.querySelector("head");
                  return (
                    (i.name = "instantsearch:widgets"),
                    {
                      $$type: "ais.metadata",
                      $$internal: r,
                      onStateChange: function () {},
                      subscribe: function () {
                        setTimeout(function () {
                          var e = t.client;
                          (n.ua =
                            e.transporter && e.transporter.userAgent
                              ? e.transporter.userAgent.value
                              : e._ua),
                            re(t.mainIndex.getWidgets(), t, n),
                            t.middleware.forEach(function (e) {
                              return n.widgets.push({
                                middleware: !0,
                                type: e.instance.$$type,
                                internal: e.instance.$$internal,
                              });
                            }),
                            (i.content = JSON.stringify(n)),
                            a.appendChild(i);
                        }, 0);
                      },
                      started: function () {},
                      unsubscribe: function () {
                        i.remove();
                      },
                    }
                  );
                };
              })({ $$internal: !0 })
            ),
          t
        );
      }
      return (
        (t = c),
        (r = [
          {
            key: "_isSearchStalled",
            get: function () {
              return "stalled" === this.status;
            },
          },
          {
            key: "use",
            value: function () {
              for (
                var e = this, t = arguments.length, r = new Array(t), n = 0;
                n < t;
                n++
              )
                r[n] = arguments[n];
              var i = r.map(function (t) {
                var r = Ut(
                  {
                    $$type: "__unknown__",
                    $$internal: !1,
                    subscribe: G,
                    started: G,
                    unsubscribe: G,
                    onStateChange: G,
                  },
                  t({ instantSearchInstance: e })
                );
                return e.middleware.push({ creator: t, instance: r }), r;
              });
              return (
                this.started &&
                  i.forEach(function (e) {
                    e.subscribe(), e.started();
                  }),
                this
              );
            },
          },
          {
            key: "unuse",
            value: function () {
              for (
                var e = arguments.length, t = new Array(e), r = 0;
                r < e;
                r++
              )
                t[r] = arguments[r];
              return (
                this.middleware
                  .filter(function (e) {
                    return t.includes(e.creator);
                  })
                  .forEach(function (e) {
                    return e.instance.unsubscribe();
                  }),
                (this.middleware = this.middleware.filter(function (e) {
                  return !t.includes(e.creator);
                })),
                this
              );
            },
          },
          {
            key: "EXPERIMENTAL_use",
            value: function () {
              return this.use.apply(this, arguments);
            },
          },
          {
            key: "addWidget",
            value: function (e) {
              return this.addWidgets([e]);
            },
          },
          {
            key: "addWidgets",
            value: function (e) {
              if (!Array.isArray(e))
                throw new Error(
                  Ct(
                    "The `addWidgets` method expects an array of widgets. Please use `addWidget`."
                  )
                );
              if (
                e.some(function (e) {
                  return (
                    "function" != typeof e.init && "function" != typeof e.render
                  );
                })
              )
                throw new Error(
                  Ct(
                    "The widget definition expects a `render` and/or an `init` method."
                  )
                );
              return this.mainIndex.addWidgets(e), this;
            },
          },
          {
            key: "removeWidget",
            value: function (e) {
              return this.removeWidgets([e]);
            },
          },
          {
            key: "removeWidgets",
            value: function (e) {
              if (!Array.isArray(e))
                throw new Error(
                  Ct(
                    "The `removeWidgets` method expects an array of widgets. Please use `removeWidget`."
                  )
                );
              if (
                e.some(function (e) {
                  return "function" != typeof e.dispose;
                })
              )
                throw new Error(
                  Ct("The widget definition expects a `dispose` method.")
                );
              return this.mainIndex.removeWidgets(e), this;
            },
          },
          {
            key: "start",
            value: function () {
              var e = this;
              if (this.started)
                throw new Error(
                  Ct("The `start` method has already been called once.")
                );
              var t = this.mainHelper || U(this.client, this.indexName);
              if (
                ((t.search = function () {
                  return (
                    (e.status = "loading"),
                    e.scheduleRender(!1),
                    t.searchOnlyWithDerivedHelpers()
                  );
                }),
                this._searchFunction)
              ) {
                var r = {
                  search: function () {
                    return new Promise(G);
                  },
                };
                (this._mainHelperSearch = t.search.bind(t)),
                  (t.search = function () {
                    var n = e.mainIndex.getHelper(),
                      i = U(r, n.state.index, n.state);
                    return (
                      i.once("search", function (t) {
                        var r = t.state;
                        n.overrideStateWithoutTriggeringChangeEvent(r),
                          e._mainHelperSearch();
                      }),
                      i.on("change", function (e) {
                        var t = e.state;
                        n.setState(t);
                      }),
                      e._searchFunction(i),
                      t
                    );
                  });
              }
              if (
                (t.on("error", function (t) {
                  var r = t.error;
                  if (!(r instanceof Error)) {
                    var n = r;
                    r = Object.keys(n).reduce(function (e, t) {
                      return (e[t] = n[t]), e;
                    }, new Error(n.message));
                  }
                  (r.error = r),
                    (e.error = r),
                    (e.status = "error"),
                    e.scheduleRender(!1),
                    e.emit("error", r);
                }),
                (this.mainHelper = t),
                this.middleware.forEach(function (e) {
                  e.instance.subscribe();
                }),
                this.mainIndex.init({
                  instantSearchInstance: this,
                  parent: null,
                  uiState: this._initialUiState,
                }),
                this._initialResults)
              ) {
                var n = this.scheduleSearch;
                (this.scheduleSearch = xt(G)),
                  xt(function () {
                    e.scheduleSearch = n;
                  })();
              } else
                this.mainIndex.getWidgets().length > 0 && this.scheduleSearch();
              (this.helper = this.mainIndex.getHelper()),
                (this.started = !0),
                this.middleware.forEach(function (e) {
                  e.instance.started();
                });
            },
          },
          {
            key: "dispose",
            value: function () {
              var e;
              this.scheduleSearch.cancel(),
                this.scheduleRender.cancel(),
                clearTimeout(this._searchStalledTimer),
                this.removeWidgets(this.mainIndex.getWidgets()),
                this.mainIndex.dispose(),
                (this.started = !1),
                this.removeAllListeners(),
                null === (e = this.mainHelper) ||
                  void 0 === e ||
                  e.removeAllListeners(),
                (this.mainHelper = null),
                (this.helper = null),
                this.middleware.forEach(function (e) {
                  e.instance.unsubscribe();
                });
            },
          },
          {
            key: "scheduleStalledRender",
            value: function () {
              var e = this;
              this._searchStalledTimer ||
                (this._searchStalledTimer = setTimeout(function () {
                  (e.status = "stalled"), e.scheduleRender();
                }, this._stalledSearchDelay));
            },
          },
          {
            key: "setUiState",
            value: function (e) {
              var t = this,
                r =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1];
              if (!this.mainHelper)
                throw new Error(
                  Ct(
                    "The `start` method needs to be called before `setUiState`."
                  )
                );
              this.mainIndex.refreshUiState();
              var n =
                "function" == typeof e
                  ? e(this.mainIndex.getWidgetUiState({}))
                  : e;
              this.onStateChange && r
                ? this.onStateChange({
                    uiState: n,
                    setUiState: function (e) {
                      Mt("function" == typeof e ? e(n) : e, t.mainIndex),
                        t.scheduleSearch(),
                        t.onInternalStateChange();
                    },
                  })
                : (Mt(n, this.mainIndex),
                  this.scheduleSearch(),
                  this.onInternalStateChange());
            },
          },
          {
            key: "getUiState",
            value: function () {
              return (
                this.started && this.mainIndex.refreshUiState(),
                this.mainIndex.getWidgetUiState({})
              );
            },
          },
          {
            key: "createURL",
            value: function () {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              if (!this.started)
                throw new Error(
                  Ct(
                    "The `start` method needs to be called before `createURL`."
                  )
                );
              return this._createURL(e);
            },
          },
          {
            key: "refresh",
            value: function () {
              if (!this.mainHelper)
                throw new Error(
                  Ct("The `start` method needs to be called before `refresh`.")
                );
              this.mainHelper.clearCache().search();
            },
          },
        ]),
        r && Bt(t.prototype, r),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        c
      );
    })(Z);
    var Vt = r(688),
      Lt = (0, x.createContext)(null);
    function Yt() {
      return (0, x.useContext)(Lt);
    }
    var qt = (0, x.createContext)(null);
    function Kt() {
      return (0, x.useContext)(qt);
    }
    const _t = "6.38.1";
    function $t(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function er() {
      return ((e = (0, x.useReducer)(function (e) {
        return e + 1;
      }, 0)),
      (t = 2),
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
        (function (e, t) {
          var r =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != r) {
            var n,
              i,
              _x,
              a,
              c = [],
              _n = !0,
              s = !1;
            try {
              if (((_x = (r = r.call(e)).next), 0 === t)) {
                if (Object(r) !== r) return;
                _n = !1;
              } else
                for (
                  ;
                  !(_n = (n = _x.call(r)).done) &&
                  (c.push(n.value), c.length !== t);
                  _n = !0
                );
            } catch (e) {
              (s = !0), (i = e);
            } finally {
              try {
                if (
                  !_n &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (s) throw i;
              }
            }
            return c;
          }
        })(e, t) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return $t(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? $t(e, t)
                : void 0
            );
          }
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })())[1];
      var e, t;
    }
    var tr = [
        "react (".concat(x.version, ")"),
        "react-instantsearch (".concat(_t, ")"),
        "react-instantsearch-hooks (".concat(_t, ")"),
      ],
      rr = "react-instantsearch-server (".concat(_t, ")");
    function nr(e, t) {
      "function" == typeof e.addAlgoliaAgent &&
        t.filter(Boolean).forEach(function (t) {
          e.addAlgoliaAgent(t);
        });
    }
    var ir = ["children"];
    function ar(e) {
      var t = e.children,
        r = (function (e) {
          var t = er(),
            r = Yt(),
            n = Kt(),
            i = null == n ? void 0 : n.initialResults,
            a = (0, x.useRef)(e),
            c = (0, x.useRef)(null);
          if ((n && (c = n.ssrSearchRef), null === c.current)) {
            var s = new Jt(e);
            (s._schedule = function (e) {
              s._schedule.queue.push(e),
                clearTimeout(s._schedule.timer),
                (s._schedule.timer = setTimeout(function () {
                  s._schedule.queue.forEach(function (e) {
                    e();
                  }),
                    (s._schedule.queue = []);
                }, 0));
            }),
              (s._schedule.queue = []),
              (r || i) && (s._initialResults = i || {}),
              nr(e.searchClient, [].concat(tr, [r && rr])),
              (r || i) && s.start(),
              r && r.notifyServer({ search: s }),
              e.routing,
              (c.current = s);
          }
          var o,
            u = c.current,
            l = a.current;
          l.indexName !== e.indexName &&
            (u.helper.setIndex(e.indexName).search(), (a.current = e)),
            l.searchClient !== e.searchClient &&
              (nr(e.searchClient, [].concat(tr, [r && rr])),
              u.mainHelper.setClient(e.searchClient).search(),
              (a.current = e)),
            l.onStateChange !== e.onStateChange &&
              ((u.onStateChange = e.onStateChange), (a.current = e)),
            l.searchFunction !== e.searchFunction &&
              ((u._searchFunction = e.searchFunction), (a.current = e)),
            l.stalledSearchDelay !== e.stalledSearchDelay &&
              ((u._stalledSearchDelay =
                null !== (o = e.stalledSearchDelay) && void 0 !== o ? o : 200),
              (a.current = e));
          var f = (0, x.useRef)(null),
            h = (0, Vt.useSyncExternalStore)(
              (0, x.useCallback)(
                function () {
                  var e = c.current;
                  return (
                    null === f.current
                      ? e.started || (e.start(), t())
                      : (clearTimeout(f.current),
                        (e._preventWidgetCleanup = !1)),
                    function () {
                      clearTimeout(e._schedule.timer),
                        (f.current = setTimeout(function () {
                          e.dispose();
                        })),
                        (e._preventWidgetCleanup = !0);
                    }
                  );
                },
                [t]
              ),
              function () {
                return c.current;
              },
              function () {
                return c.current;
              }
            );
          return h;
        })(
          (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              i = (function (e, t) {
                if (null == e) return {};
                var r,
                  n,
                  i = {},
                  a = Object.keys(e);
                for (n = 0; n < a.length; n++)
                  (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
                return i;
              })(e, t);
            if (Object.getOwnPropertySymbols) {
              var a = Object.getOwnPropertySymbols(e);
              for (n = 0; n < a.length; n++)
                (r = a[n]),
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(e, r) &&
                      (i[r] = e[r]));
            }
            return i;
          })(e, ir)
        );
      return r.started
        ? x.createElement(
            D.Provider,
            { value: r },
            x.createElement(M.Provider, { value: r.mainIndex }, t)
          )
        : null;
    }
    function cr(e, t) {
      if (!e) throw new Error("Invariant failed");
    }
    function sr() {
      var e = (0, x.useContext)(M);
      return cr(null !== e), e;
    }
    var or = "undefined" != typeof window ? x.useLayoutEffect : x.useEffect;
    function ur(e) {
      return (
        (ur =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        ur(e)
      );
    }
    var lr = Object.prototype.hasOwnProperty;
    function fr(e, t, r) {
      if (null != r && r(e, t)) return !0;
      var n, i;
      if (e === t) return !0;
      if (e && t && (n = e.constructor) === t.constructor) {
        if (n === Date) return e.getTime() === t.getTime();
        if (n === RegExp) return e.toString() === t.toString();
        if (n === Array) {
          if ((i = e.length) === t.length) for (; i-- && fr(e[i], t[i], r); );
          return -1 === i;
        }
        if (!n || "object" === ur(e)) {
          for (n in ((i = 0), e)) {
            if (lr.call(e, n) && ++i && !lr.call(t, n)) return !1;
            if (!(n in t) || !fr(e[n], t[n], r)) return !1;
          }
          return Object.keys(t).length === i;
        }
      }
      return e != e && t != t;
    }
    function hr(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function dr(e) {
      var t,
        r,
        n =
          ((t = (0, x.useState)(function () {
            return e;
          })),
          (r = 2),
          (function (e) {
            if (Array.isArray(e)) return e;
          })(t) ||
            (function (e, t) {
              var r =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != r) {
                var n,
                  i,
                  _x,
                  a,
                  c = [],
                  _n = !0,
                  s = !1;
                try {
                  if (((_x = (r = r.call(e)).next), 0 === t)) {
                    if (Object(r) !== r) return;
                    _n = !1;
                  } else
                    for (
                      ;
                      !(_n = (n = _x.call(r)).done) &&
                      (c.push(n.value), c.length !== t);
                      _n = !0
                    );
                } catch (e) {
                  (s = !0), (i = e);
                } finally {
                  try {
                    if (
                      !_n &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw i;
                  }
                }
                return c;
              }
            })(t, r) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return hr(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  "Object" === r && e.constructor && (r = e.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(e)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? hr(e, t)
                    : void 0
                );
              }
            })(t, r) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()),
        i = n[0],
        a = n[1];
      return fr(i, e) || a(e), i;
    }
    function pr() {
      var e = (0, x.useContext)(D);
      return cr(null !== e), e;
    }
    function mr(e) {
      var t = e.widget,
        r = e.parentIndex,
        n = e.props,
        i = e.shouldSsr,
        a = (0, x.useRef)(n);
      (0, x.useEffect)(
        function () {
          a.current = n;
        },
        [n]
      );
      var c = (0, x.useRef)(t);
      (0, x.useEffect)(
        function () {
          c.current = t;
        },
        [t]
      );
      var s = (0, x.useRef)(null),
        o = i && !r.getWidgets().includes(t),
        u = pr();
      or(
        function () {
          var e = c.current;
          return (
            s.current
              ? (clearTimeout(s.current),
                fr(n, a.current) || (r.removeWidgets([e]), r.addWidgets([t])))
              : o || r.addWidgets([t]),
            function () {
              s.current = setTimeout(function () {
                u._schedule(function () {
                  u._preventWidgetCleanup || r.removeWidgets([e]);
                });
              });
            }
          );
        },
        [r, t, o, u, n]
      ),
        o && r.addWidgets([t]);
    }
    var gr = ["children"];
    function yr(e) {
      var t,
        r,
        n,
        i,
        a,
        c,
        s,
        o,
        u,
        l = e.children,
        f =
          ((t = (function (e, t) {
            if (null == e) return {};
            var r,
              n,
              i = (function (e, t) {
                if (null == e) return {};
                var r,
                  n,
                  i = {},
                  a = Object.keys(e);
                for (n = 0; n < a.length; n++)
                  (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
                return i;
              })(e, t);
            if (Object.getOwnPropertySymbols) {
              var a = Object.getOwnPropertySymbols(e);
              for (n = 0; n < a.length; n++)
                (r = a[n]),
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(e, r) &&
                      (i[r] = e[r]));
            }
            return i;
          })(e, gr)),
          (r = Yt()),
          (n = Kt()),
          (i = null == n ? void 0 : n.initialResults),
          (a = sr()),
          (c = dr(t)),
          (s = (0, x.useMemo)(
            function () {
              return nt(c);
            },
            [c]
          )),
          (o = s.getHelper()),
          (u = er()),
          or(
            function () {
              u();
            },
            [o, u]
          ),
          mr({
            widget: s,
            parentIndex: a,
            props: c,
            shouldSsr: Boolean(r || i),
          }),
          s);
      return null === f.getHelper()
        ? null
        : x.createElement(M.Provider, { value: f }, l);
    }
    function Ar(e) {
      return (
        (Ar =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Ar(e)
      );
    }
    function br(e) {
      if (
        !(function (e) {
          return "object" === Ar(e) && null !== e;
        })(e) ||
        "[object Object]" !==
          (function (e) {
            return null === e
              ? void 0 === e
                ? "[object Undefined]"
                : "[object Null]"
              : Object.prototype.toString.call(e);
          })(e)
      )
        return !1;
      if (null === Object.getPrototypeOf(e)) return !0;
      for (var t = e; null !== Object.getPrototypeOf(t); )
        t = Object.getPrototypeOf(t);
      return Object.getPrototypeOf(e) === t;
    }
    function vr(e) {
      return (
        (vr =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        vr(e)
      );
    }
    function Ir(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Sr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ir(Object(r), !0).forEach(function (t) {
              wr(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Ir(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function wr(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== vr(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== vr(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === vr(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    var Rr = je({ name: "configure", connector: !0 });
    function jr(e, t) {
      return e.setQueryParameters(
        Object.keys(t.searchParameters).reduce(function (e, t) {
          return Sr(Sr({}, e), {}, wr({}, t, void 0));
        }, {})
      );
    }
    const Pr = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : G,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : G;
      return function (r) {
        if (!r || !br(r.searchParameters))
          throw new Error(
            Rr("The `searchParameters` option expects an object.")
          );
        var n = {};
        return {
          $$type: "ais.configure",
          init: function (t) {
            var r = t.instantSearchInstance;
            e(
              Sr(
                Sr({}, this.getWidgetRenderState(t)),
                {},
                { instantSearchInstance: r }
              ),
              !0
            );
          },
          render: function (t) {
            var r = t.instantSearchInstance;
            e(
              Sr(
                Sr({}, this.getWidgetRenderState(t)),
                {},
                { instantSearchInstance: r }
              ),
              !1
            );
          },
          dispose: function (e) {
            var n = e.state;
            return t(), jr(n, r);
          },
          getRenderState: function (e, t) {
            var r,
              n = this.getWidgetRenderState(t);
            return Sr(
              Sr({}, e),
              {},
              {
                configure: Sr(
                  Sr({}, n),
                  {},
                  {
                    widgetParams: Sr(
                      Sr({}, n.widgetParams),
                      {},
                      {
                        searchParameters: We(
                          new U.SearchParameters(
                            null === (r = e.configure) || void 0 === r
                              ? void 0
                              : r.widgetParams.searchParameters
                          ),
                          new U.SearchParameters(
                            n.widgetParams.searchParameters
                          )
                        ).getQueryParams(),
                      }
                    ),
                  }
                ),
              }
            );
          },
          getWidgetRenderState: function (e) {
            var t = e.helper;
            return (
              n.refine ||
                (n.refine = (function (e) {
                  return function (t) {
                    var n = jr(e.state, r),
                      i = We(n, new U.SearchParameters(t));
                    (r.searchParameters = t), e.setState(i).search();
                  };
                })(t)),
              { refine: n.refine, widgetParams: r }
            );
          },
          getWidgetSearchParameters: function (e, t) {
            var n = t.uiState;
            return We(
              e,
              new U.SearchParameters(
                Sr(Sr({}, n.configure), r.searchParameters)
              )
            );
          },
          getWidgetUiState: function (e) {
            return Sr(
              Sr({}, e),
              {},
              { configure: Sr(Sr({}, e.configure), r.searchParameters) }
            );
          },
        };
      };
    };
    function Or(e) {
      var t, r, n;
      return new U.SearchResults(
        e,
        [
          {
            query: null !== (t = e.query) && void 0 !== t ? t : "",
            page: null !== (r = e.page) && void 0 !== r ? r : 0,
            hitsPerPage: null !== (n = e.hitsPerPage) && void 0 !== n ? n : 20,
            hits: [],
            nbHits: 0,
            nbPages: 0,
            params: "",
            exhaustiveNbHits: !0,
            exhaustiveFacetsCount: !0,
            processingTimeMS: 0,
            index: e.index,
          },
        ],
        { __isArtificial: !0 }
      );
    }
    function Er(e) {
      return (
        (Er =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Er(e)
      );
    }
    function Tr(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Hr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Tr(Object(r), !0).forEach(function (t) {
              kr(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Tr(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function kr(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== Er(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== Er(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === Er(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function xr(e) {
      var t = e.getHelper(),
        r = e.getResults() || Or(t.state),
        n = e.getScopedResults().map(function (t) {
          var n = t.indexId === e.getIndexId() ? r : Or(t.helper.state);
          return Hr(Hr({}, t), {}, { results: t.results || n });
        });
      return { results: r, scopedResults: n };
    }
    function Mr(e) {
      return (
        (Mr =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Mr(e)
      );
    }
    var Dr = ["instantSearchInstance", "widgetParams"],
      Zr = ["widgetParams"];
    function Ur(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e;
        })(e) ||
        (function (e, t) {
          var r =
            null == e
              ? null
              : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                e["@@iterator"];
          if (null != r) {
            var n,
              i,
              _x,
              a,
              c = [],
              _n = !0,
              s = !1;
            try {
              if (((_x = (r = r.call(e)).next), 0 === t)) {
                if (Object(r) !== r) return;
                _n = !1;
              } else
                for (
                  ;
                  !(_n = (n = _x.call(r)).done) &&
                  (c.push(n.value), c.length !== t);
                  _n = !0
                );
            } catch (e) {
              (s = !0), (i = e);
            } finally {
              try {
                if (
                  !_n &&
                  null != r.return &&
                  ((a = r.return()), Object(a) !== a)
                )
                  return;
              } finally {
                if (s) throw i;
              }
            }
            return c;
          }
        })(e, t) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return Br(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? Br(e, t)
                : void 0
            );
          }
        })(e, t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function Br(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function Nr(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function zr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Nr(Object(r), !0).forEach(function (t) {
              Gr(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Nr(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function Gr(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== Mr(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== Mr(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === Mr(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    function Fr(e, t) {
      if (null == e) return {};
      var r,
        n,
        i = (function (e, t) {
          if (null == e) return {};
          var r,
            n,
            i = {},
            a = Object.keys(e);
          for (n = 0; n < a.length; n++)
            (r = a[n]), t.indexOf(r) >= 0 || (i[r] = e[r]);
          return i;
        })(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (n = 0; n < a.length; n++)
          (r = a[n]),
            t.indexOf(r) >= 0 ||
              (Object.prototype.propertyIsEnumerable.call(e, r) &&
                (i[r] = e[r]));
      }
      return i;
    }
    function Qr(e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        n = Yt(),
        i = pr(),
        a = sr(),
        c = dr(t),
        s = dr(r),
        o = (0, x.useRef)(!0),
        u = (0, x.useRef)(null),
        l = (0, x.useMemo)(
          function () {
            return zr(
              zr(
                {},
                e(
                  function (e, t) {
                    if (t) o.current = !0;
                    else if (o.current) {
                      e.instantSearchInstance, e.widgetParams;
                      var r = Fr(e, Dr);
                      fr(r, u.current, function (e, t) {
                        return (
                          (null == e ? void 0 : e.constructor) === Function &&
                          (null == t ? void 0 : t.constructor) === Function
                        );
                      }) || (p(r), (u.current = r));
                    }
                  },
                  function () {
                    o.current = !1;
                  }
                )(c)
              ),
              s
            );
          },
          [e, c, s]
        ),
        f = (0, x.useState)(function () {
          if (l.getWidgetRenderState) {
            var e,
              t = a.getHelper(),
              r = a.getWidgetUiState({})[a.getIndexId()];
            t.state =
              (null === (e = l.getWidgetSearchParameters) || void 0 === e
                ? void 0
                : e.call(l, t.state, { uiState: r })) || t.state;
            var n = xr(a),
              c = n.results,
              s = n.scopedResults,
              o = l.getWidgetRenderState({
                helper: t,
                parent: a,
                instantSearchInstance: i,
                results: c,
                scopedResults: s,
                state: t.state,
                renderState: i.renderState,
                templatesConfig: i.templatesConfig,
                createURL: a.createURL,
                searchMetadata: { isSearchStalled: "stalled" === i.status },
                status: i.status,
                error: i.error,
              });
            return o.widgetParams, Fr(o, Zr);
          }
          return {};
        }),
        h = Ur(f, 2),
        d = h[0],
        p = h[1];
      return (
        mr({ widget: l, parentIndex: a, props: c, shouldSsr: Boolean(n) }), d
      );
    }
    function Wr(e) {
      return (
        (function (e, t) {
          Qr(Pr, { searchParameters: e }, { $$widgetType: "ais.configure" });
        })(e),
        null
      );
    }
    const Cr = window.lodash;
    function Xr(e, t) {
      if (void 0 === e || "function" != typeof e)
        throw new Error(
          "The render function is not valid (received type "
            .concat(
              ((r = e), Object.prototype.toString.call(r).slice(8, -1)),
              ").\n\n"
            )
            .concat(t)
        );
      var r;
    }
    function Jr(e) {
      return (
        (Jr =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        Jr(e)
      );
    }
    function Vr(e, t) {
      var r = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          r.push.apply(r, n);
      }
      return r;
    }
    function Lr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Vr(Object(r), !0).forEach(function (t) {
              Yr(e, t, r[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : Vr(Object(r)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(r, t)
              );
            });
      }
      return e;
    }
    function Yr(e, t, r) {
      return (
        (t = (function (e) {
          var t = (function (e, t) {
            if ("object" !== Jr(e) || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, "string");
              if ("object" !== Jr(n)) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(e);
          })(e);
          return "symbol" === Jr(t) ? t : String(t);
        })(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      );
    }
    var qr = je({ name: "search-box", connector: !0 }),
      Kr = function (e, t) {
        return t(e);
      };
    const _r = function (e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : G;
      return (
        Xr(e, qr()),
        function (r) {
          var n,
            i,
            a = (r || {}).queryHook,
            c = void 0 === a ? Kr : a;
          return {
            $$type: "ais.searchBox",
            init: function (t) {
              var r = t.instantSearchInstance;
              e(
                Lr(
                  Lr({}, this.getWidgetRenderState(t)),
                  {},
                  { instantSearchInstance: r }
                ),
                !0
              );
            },
            render: function (t) {
              var r = t.instantSearchInstance;
              e(
                Lr(
                  Lr({}, this.getWidgetRenderState(t)),
                  {},
                  { instantSearchInstance: r }
                ),
                !1
              );
            },
            dispose: function (e) {
              var r = e.state;
              return t(), r.setQueryParameter("query", void 0);
            },
            getRenderState: function (e, t) {
              return Lr(
                Lr({}, e),
                {},
                { searchBox: this.getWidgetRenderState(t) }
              );
            },
            getWidgetRenderState: function (e) {
              var t = e.helper,
                a = e.searchMetadata,
                s = e.state;
              return (
                n ||
                  ((n = function (e) {
                    c(e, function (e) {
                      return t.setQuery(e).search();
                    });
                  }),
                  (i = function () {
                    t.setQuery("").search();
                  })),
                {
                  query: s.query || "",
                  refine: n,
                  clear: i,
                  widgetParams: r,
                  isSearchStalled: a.isSearchStalled,
                }
              );
            },
            getWidgetUiState: function (e, t) {
              var r = t.searchParameters.query || "";
              return "" === r || (e && e.query === r)
                ? e
                : Lr(Lr({}, e), {}, { query: r });
            },
            getWidgetSearchParameters: function (e, t) {
              var r = t.uiState;
              return e.setQueryParameter("query", r.query || "");
            },
          };
        }
      );
    };
    function $r(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function en() {
      var e,
        t,
        r = pr(),
        n = sr(),
        i =
          ((e = (0, x.useState)(function () {
            return xr(n);
          })),
          (t = 2),
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
            (function (e, t) {
              var r =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != r) {
                var n,
                  i,
                  _x,
                  a,
                  c = [],
                  _n = !0,
                  s = !1;
                try {
                  if (((_x = (r = r.call(e)).next), 0 === t)) {
                    if (Object(r) !== r) return;
                    _n = !1;
                  } else
                    for (
                      ;
                      !(_n = (n = _x.call(r)).done) &&
                      (c.push(n.value), c.length !== t);
                      _n = !0
                    );
                } catch (e) {
                  (s = !0), (i = e);
                } finally {
                  try {
                    if (
                      !_n &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw i;
                  }
                }
                return c;
              }
            })(e, t) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return $r(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  "Object" === r && e.constructor && (r = e.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(e)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? $r(e, t)
                    : void 0
                );
              }
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()),
        a = i[0],
        c = i[1];
      return (
        (0, x.useEffect)(
          function () {
            function e() {
              var e = n.getResults();
              null !== e &&
                c({ results: e, scopedResults: n.getScopedResults() });
            }
            return (
              r.addListener("render", e),
              function () {
                r.removeListener("render", e);
              }
            );
          },
          [r, n]
        ),
        a
      );
    }
    function tn(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }
    function rn() {
      var e,
        t,
        r = pr(),
        n = sr(),
        i = n.getIndexId(),
        a =
          ((e = (0, x.useState)(function () {
            return r.getUiState();
          })),
          (t = 2),
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
            (function (e, t) {
              var r =
                null == e
                  ? null
                  : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                    e["@@iterator"];
              if (null != r) {
                var n,
                  i,
                  _x,
                  a,
                  c = [],
                  _n = !0,
                  s = !1;
                try {
                  if (((_x = (r = r.call(e)).next), 0 === t)) {
                    if (Object(r) !== r) return;
                    _n = !1;
                  } else
                    for (
                      ;
                      !(_n = (n = _x.call(r)).done) &&
                      (c.push(n.value), c.length !== t);
                      _n = !0
                    );
                } catch (e) {
                  (s = !0), (i = e);
                } finally {
                  try {
                    if (
                      !_n &&
                      null != r.return &&
                      ((a = r.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw i;
                  }
                }
                return c;
              }
            })(e, t) ||
            (function (e, t) {
              if (e) {
                if ("string" == typeof e) return tn(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return (
                  "Object" === r && e.constructor && (r = e.constructor.name),
                  "Map" === r || "Set" === r
                    ? Array.from(e)
                    : "Arguments" === r ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                    ? tn(e, t)
                    : void 0
                );
              }
            })(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()),
        c = a[0],
        s = a[1],
        o = c[i],
        u = (0, x.useCallback)(
          function (e) {
            r.setUiState(e);
          },
          [r]
        ),
        l = (0, x.useCallback)(
          function (e) {
            n.setIndexUiState(e);
          },
          [n]
        );
      return (
        (0, x.useEffect)(
          function () {
            function e() {
              s(r.getUiState());
            }
            return (
              r.addListener("render", e),
              function () {
                r.removeListener("render", e);
              }
            );
          },
          [r]
        ),
        { uiState: c, setUiState: u, indexUiState: o, setIndexUiState: l }
      );
    }
    const nn = {
      getSearchResult: (e, t, r) =>
        P()({
          path: "newfold-ai/v1/search",
          method: "POST",
          data: { user_prompt: e, identifier: t, extra: r },
        }),
    };
    var an, cn;
    function sn() {
      return (
        (sn = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        sn.apply(this, arguments)
      );
    }
    var on = function (e) {
      return x.createElement(
        "svg",
        sn(
          {
            width: 24,
            height: 24,
            fill: "#1D1D1F",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e
        ),
        an ||
          (an = x.createElement("rect", {
            y: 24,
            width: 24,
            height: 24,
            rx: 2,
            transform: "rotate(-90 0 24)",
            fill: "#F0F3F5",
          })),
        cn ||
          (cn = x.createElement("path", {
            d: "M6 10.5c0 3 2.5 5.5 5.5 5.5 1.1 0 2.1-.3 3-.9l3 3.4 1.1-1-2.9-3.4c.9-1 1.4-2.2 1.4-3.6 0-3-2.5-5.5-5.5-5.5C8.5 5 6 7.5 6 10.5Zm9.5 0c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4Z",
            fill: "#999",
          }))
      );
    };
    function un() {
      return (
        (un = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        un.apply(this, arguments)
      );
    }
    var ln = function (e) {
      return x.createElement(
        "svg",
        un(
          {
            height: 12,
            width: 12,
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "-13.63 -13.63 254.36 254.36",
            xmlSpace: "preserve",
            fill: "#1D1D1F",
            stroke: "#394150",
          },
          e
        ),
        x.createElement("path", {
          style: { fill: "#010002" },
          d: "m152.835 39.285-5.902 5.898 64.18 64.19H0v8.35h211.124l-64.191 64.179 5.902 5.909 74.261-74.261z",
        })
      );
    };
    const fn = (e) => {
        let { searchTitle: t, onGo: r } = e;
        return (0, i.createElement)(
          i.Fragment,
          null,
          (0, i.createElement)(
            "div",
            { className: "algoliaResult", onClick: r },
            (0, i.createElement)("p", null, t),
            (0, i.createElement)(
              "div",
              { className: "svg" },
              (0, i.createElement)(ln, null)
            )
          )
        );
      },
      hn = "nfd-help-center/v1",
      dn = () => "true" === localStorage.getItem("helpVisible"),
      pn = (e, t) => {
        const r = new l("nfd-help-center", e, { value: t, time: new Date() });
        E(r);
      },
      mn = (e) => {
        let { postId: t } = e;
        const [r, n] = (0, i.useState)(""),
          a = (0, i.useRef)(null),
          c = (0, i.useRef)(null);
        return (
          (0, i.useEffect)(() => {
            n(""),
              (c.current.className = "feedback-button no"),
              (a.current.className = "feedback-button yes");
          }, [t]),
          (0, i.useEffect)(() => {
            (async () => {
              ("helpful" !== r && "notHelpful" !== r) ||
                (((e, t) => {
                  P()({
                    path: hn + "/feedback",
                    method: "POST",
                    data: { post_id: e, status: t },
                  });
                })(t, r),
                pn("feedback", "status"));
            })(),
              "helpful" === r &&
                ((a.current.className = "feedback-button yes selected-yes"),
                (c.current.className = "feedback-button no")),
              "notHelpful" === r &&
                ((c.current.className = "feedback-button no selected-no"),
                (a.current.className = "feedback-button yes"));
          }, [r]),
          (0, i.createElement)(
            "div",
            { className: "feedback-container" },
            (0, i.createElement)(
              "div",
              { className: "feedback-question" },
              (0, i.createElement)(
                "p",
                null,
                (0, i.createElement)(
                  "b",
                  null,
                  (0, T.__)(
                    "Did this result help you ?",
                    "wp-module-help-center"
                  )
                )
              )
            ),
            (0, i.createElement)(
              "div",
              { class: "icon" },
              (0, i.createElement)(
                "button",
                {
                  ref: a,
                  onClick: () => {
                    n("helpful");
                  },
                  class: "feedback-button yes",
                },
                "helpful" === r && (0, i.createElement)(i.Fragment, null, "🥳"),
                " Yes"
              ),
              (0, i.createElement)(
                "button",
                {
                  onClick: () => {
                    n("notHelpful");
                  },
                  ref: c,
                  class: "feedback-button no",
                },
                "notHelpful" === r &&
                  (0, i.createElement)(i.Fragment, null, "😭"),
                " No"
              )
            )
          )
        );
      };
    var gn, yn;
    function An() {
      return (
        (An = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        An.apply(this, arguments)
      );
    }
    var bn = function (e) {
      return x.createElement(
        "svg",
        An(
          {
            width: 302,
            height: 186,
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink",
          },
          e
        ),
        gn ||
          (gn = x.createElement("path", {
            fill: "url(#no-result_svg__a)",
            d: "M0 0h302v186H0z",
          })),
        yn ||
          (yn = x.createElement(
            "defs",
            null,
            x.createElement(
              "pattern",
              {
                id: "no-result_svg__a",
                patternContentUnits: "objectBoundingBox",
                width: 1,
                height: 1,
              },
              x.createElement("use", {
                xlinkHref: "#no-result_svg__b",
                transform: "matrix(.0009 0 0 .00145 0 0)",
              })
            ),
            x.createElement("image", {
              id: "no-result_svg__b",
              width: 1121,
              height: 690,
              xlinkHref:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGEAAAKyCAYAAAB16sOJAAAACXBIWXMAAAsTAAALEwEAmpwYAABFUGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczppbGx1c3RyYXRvcj0iaHR0cDovL25zLmFkb2JlLmNvbS9pbGx1c3RyYXRvci8xLjAvIiB4bWxuczp4bXBUUGc9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC90L3BnLyIgeG1sbnM6c3REaW09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9EaW1lbnNpb25zIyIgeG1sbnM6c3RGbnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9Gb250IyIgeG1sbnM6eG1wRz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL2cvIiB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMTEtMTRUMTY6MTY6MTItMDc6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTExLTE0VDE2OjE2OjEyLTA3OjAwIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMi0yMlQxMzoxMDowMi0wNzowMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBJbGx1c3RyYXRvciAyNS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmNiMDdhMjNiLWJhNjgtNGQzMi1hN2RmLTMwYjRkYTk3YTE2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NjViZDYxOC1kMzU3LTRjMDMtODI0MS1jMDA2YjI0OWM1YzciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDo1RDIwODkyNDkzQkZEQjExOTE0QTg1OTBEMzE1MDhDOCIgeG1wTU06UmVuZGl0aW9uQ2xhc3M9InByb29mOnBkZiIgaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU9IlByaW50IiBpbGx1c3RyYXRvcjpDcmVhdG9yU3ViVG9vbD0iQUlSb2JpbiIgaWxsdXN0cmF0b3I6VHlwZT0iRG9jdW1lbnQiIHhtcFRQZzpIYXNWaXNpYmxlT3ZlcnByaW50PSJGYWxzZSIgeG1wVFBnOkhhc1Zpc2libGVUcmFuc3BhcmVuY3k9IlRydWUiIHhtcFRQZzpOUGFnZXM9IjEiIHBkZjpQcm9kdWNlcj0iQWRvYmUgUERGIGxpYnJhcnkgMTUuMDAiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8ZGM6dGl0bGU+IDxyZGY6QWx0PiA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPn5haS1hMzliYTc1MC04NzBjLTQ3NTgtYWZjNC02NzM5ZmJlNWNjMjJfPC9yZGY6bGk+IDwvcmRmOkFsdD4gPC9kYzp0aXRsZT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InV1aWQ6NWVmYTMxODktY2NmNS1mMzRhLWI5ZGUtMjU5YmY4ODYxNDUzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU2NWJkNjE4LWQzNTctNGMwMy04MjQxLWMwMDZiMjQ5YzVjNyIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjVEMjA4OTI0OTNCRkRCMTE5MTRBODU5MEQzMTUwOEM4IiBzdFJlZjpyZW5kaXRpb25DbGFzcz0icHJvb2Y6cGRmIi8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA1YjRlZDM3LThkMzItNGM0Ni05N2YwLTdiNjFlMzZhZmQ1MyIgc3RFdnQ6d2hlbj0iMjAxOC0xMC0zMFQxNjoyMzoyMi0wNjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgSWxsdXN0cmF0b3IgQ0MgMjIuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTY1YmQ2MTgtZDM1Ny00YzAzLTgyNDEtYzAwNmIyNDljNWM3IiBzdEV2dDp3aGVuPSIyMDIwLTA5LTE0VDE2OjIxOjQyLTA2OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBJbGx1c3RyYXRvciAyNC4zIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjb252ZXJ0ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImZyb20gYXBwbGljYXRpb24vcGRmIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjNzg0MDY0NC1iZTAwLTQ0NGItYTdmZC1iYjUxMmQ4NTBlMTAiIHN0RXZ0OndoZW49IjIwMjItMTEtMTRUMTY6MTI6MjEtMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjYjA3YTIzYi1iYTY4LTRkMzItYTdkZi0zMGI0ZGE5N2ExNjMiIHN0RXZ0OndoZW49IjIwMjItMTEtMTRUMTY6MTY6MTItMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMy41IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wVFBnOk1heFBhZ2VTaXplIHN0RGltOnc9IjEyMjQuMDAwMDAwIiBzdERpbTpoPSI4OTcuNDg2NTY0IiBzdERpbTp1bml0PSJQb2ludHMiLz4gPHhtcFRQZzpGb250cz4gPHJkZjpCYWc+IDxyZGY6bGkgc3RGbnQ6Zm9udE5hbWU9Ik15cmlhZFByby1SZWd1bGFyIiBzdEZudDpmb250RmFtaWx5PSJNeXJpYWQgUHJvIiBzdEZudDpmb250RmFjZT0iUmVndWxhciIgc3RGbnQ6Zm9udFR5cGU9Ik9wZW4gVHlwZSIgc3RGbnQ6dmVyc2lvblN0cmluZz0iVmVyc2lvbiAyLjExNTtQUyAyLjAwMDtob3Rjb252IDEuMC44MTttYWtlb3RmLmxpYjIuNS42MzQwNiIgc3RGbnQ6Y29tcG9zaXRlPSJGYWxzZSIgc3RGbnQ6Zm9udEZpbGVOYW1lPSIuNjg1MS5vdGYiLz4gPHJkZjpsaSBzdEZudDpmb250TmFtZT0iT3BlblNhbnMtQm9sZCIgc3RGbnQ6Zm9udEZhbWlseT0iT3BlbiBTYW5zIiBzdEZudDpmb250RmFjZT0iQm9sZCIgc3RGbnQ6Zm9udFR5cGU9Ik9wZW4gVHlwZSIgc3RGbnQ6dmVyc2lvblN0cmluZz0iVmVyc2lvbiAxLjEwIiBzdEZudDpjb21wb3NpdGU9IkZhbHNlIiBzdEZudDpmb250RmlsZU5hbWU9Ik9wZW5TYW5zLUJvbGQudHRmIi8+IDwvcmRmOkJhZz4gPC94bXBUUGc6Rm9udHM+IDx4bXBUUGc6UGxhdGVOYW1lcz4gPHJkZjpTZXE+IDxyZGY6bGk+Q3lhbjwvcmRmOmxpPiA8cmRmOmxpPk1hZ2VudGE8L3JkZjpsaT4gPHJkZjpsaT5ZZWxsb3c8L3JkZjpsaT4gPHJkZjpsaT5CbGFjazwvcmRmOmxpPiA8L3JkZjpTZXE+IDwveG1wVFBnOlBsYXRlTmFtZXM+IDx4bXBUUGc6U3dhdGNoR3JvdXBzPiA8cmRmOlNlcT4gPHJkZjpsaT4gPHJkZjpEZXNjcmlwdGlvbiB4bXBHOmdyb3VwTmFtZT0iRGVmYXVsdCBTd2F0Y2ggR3JvdXAiIHhtcEc6Z3JvdXBUeXBlPSIwIj4gPHhtcEc6Q29sb3JhbnRzPiA8cmRmOlNlcT4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IldoaXRlIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyNTUiIHhtcEc6Ymx1ZT0iMjU1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJCbGFjayIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM1IiB4bXBHOmdyZWVuPSIzMSIgeG1wRzpibHVlPSIzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQ01ZSyBSZWQiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzYiIHhtcEc6Z3JlZW49IjI4IiB4bXBHOmJsdWU9IjM2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDTVlLIFllbGxvdyIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1NSIgeG1wRzpncmVlbj0iMjQxIiB4bXBHOmJsdWU9IjAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgR3JlZW4iIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjUiIHhtcEc6Ymx1ZT0iODEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgQ3lhbiIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE3MyIgeG1wRzpibHVlPSIyMzgiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgQmx1ZSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQ2IiB4bXBHOmdyZWVuPSI0OSIgeG1wRzpibHVlPSIxNDUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkNNWUsgTWFnZW50YSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzNSIgeG1wRzpncmVlbj0iMCIgeG1wRzpibHVlPSIxMzkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTUgTT0xMDAgWT05MCBLPTEwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTkwIiB4bXBHOmdyZWVuPSIzMCIgeG1wRzpibHVlPSI0NSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09OTAgWT04NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMzgiIHhtcEc6Z3JlZW49IjY0IiB4bXBHOmJsdWU9IjU0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT04MCBZPTk1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0MCIgeG1wRzpncmVlbj0iOTAiIHhtcEc6Ymx1ZT0iNDAiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTUwIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI0NiIgeG1wRzpncmVlbj0iMTQ2IiB4bXBHOmJsdWU9IjMwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0zNSBZPTg1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjI1MCIgeG1wRzpncmVlbj0iMTc1IiB4bXBHOmJsdWU9IjY0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUgTT0wIFk9OTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjQ5IiB4bXBHOmdyZWVuPSIyMzYiIHhtcEc6Ymx1ZT0iNDkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MjAgTT0wIFk9MTAwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIxNCIgeG1wRzpncmVlbj0iMjIyIiB4bXBHOmJsdWU9IjM1Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTUwIE09MCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxMzkiIHhtcEc6Z3JlZW49IjE5NyIgeG1wRzpibHVlPSI2MyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNTUiIHhtcEc6Z3JlZW49IjE3OSIgeG1wRzpibHVlPSI3NCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz04NSBNPTEwIFk9MTAwIEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNDciIHhtcEc6Ymx1ZT0iNjkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9OTAgTT0zMCBZPTk1IEs9MzAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxMDQiIHhtcEc6Ymx1ZT0iNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzUgTT0wIFk9NzUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iNDEiIHhtcEc6Z3JlZW49IjE4MCIgeG1wRzpibHVlPSIxMTUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODAgTT0xMCBZPTQ1IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjAiIHhtcEc6Z3JlZW49IjE2NiIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NzAgTT0xNSBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMzgiIHhtcEc6Z3JlZW49IjE2OSIgeG1wRzpibHVlPSIyMjQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT01MCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjciIHhtcEc6Z3JlZW49IjExNyIgeG1wRzpibHVlPSIxODciLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTUgWT01IEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjQzIiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSIxNDMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09MTAwIFk9MjUgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM4IiB4bXBHOmdyZWVuPSIzNCIgeG1wRzpibHVlPSI5NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03NSBNPTEwMCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTAxIiB4bXBHOmdyZWVuPSI0NSIgeG1wRzpibHVlPSIxNDQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NTAgTT0xMDAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE0NCIgeG1wRzpncmVlbj0iMzkiIHhtcEc6Ymx1ZT0iMTQyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTM1IE09MTAwIFk9MzUgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE1OCIgeG1wRzpncmVlbj0iMzEiIHhtcEc6Ymx1ZT0iOTkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAgTT0xMDAgWT01MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIyMTciIHhtcEc6Z3JlZW49IjI4IiB4bXBHOmJsdWU9IjkyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT05NSBZPTIwIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzNiIgeG1wRzpncmVlbj0iNDEiIHhtcEc6Ymx1ZT0iMTIzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09MjUgWT00MCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxOTMiIHhtcEc6Z3JlZW49IjE4MCIgeG1wRzpibHVlPSIxNTQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT00NSBZPTUwIEs9NSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE1NCIgeG1wRzpncmVlbj0iMTMyIiB4bXBHOmJsdWU9IjEyMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTUwIFk9NjAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjExMyIgeG1wRzpncmVlbj0iMTAxIiB4bXBHOmJsdWU9Ijg4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTU1IE09NjAgWT02NSBLPTQwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iOTAiIHhtcEc6Z3JlZW49Ijc0IiB4bXBHOmJsdWU9IjY2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTI1IE09NDAgWT02NSBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxOTUiIHhtcEc6Z3JlZW49IjE1MyIgeG1wRzpibHVlPSIxMDciLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MzAgTT01MCBZPTc1IEs9MTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxNjgiIHhtcEc6Z3JlZW49IjEyNCIgeG1wRzpibHVlPSI3OSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0zNSBNPTYwIFk9ODAgSz0yNSIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEzOCIgeG1wRzpncmVlbj0iOTMiIHhtcEc6Ymx1ZT0iNTkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NDAgTT02NSBZPTkwIEs9MzUiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIxMTciIHhtcEc6Z3JlZW49Ijc2IiB4bXBHOmJsdWU9IjQwIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTQwIE09NzAgWT0xMDAgSz01MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9Ijk2IiB4bXBHOmdyZWVuPSI1NiIgeG1wRzpibHVlPSIxOSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz01MCBNPTcwIFk9ODAgSz03MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjU5IiB4bXBHOmdyZWVuPSIzNSIgeG1wRzpibHVlPSIyMCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz03MyBNPTQwIFk9MCBLPTAiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjcwIiB4bXBHOmdyZWVuPSIxMzQiIHhtcEc6Ymx1ZT0iMTk4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTYwIEc9ODEgQj0xMzMiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjYwIiB4bXBHOmdyZWVuPSI4MSIgeG1wRzpibHVlPSIxMzMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTI2IEc9MTY3IEI9MjIzIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIxMjYiIHhtcEc6Z3JlZW49IjE2NSIgeG1wRzpibHVlPSIyMTUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTY1IEc9MjAzIEI9MjM5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIxNjYiIHhtcEc6Z3JlZW49IjIwMiIgeG1wRzpibHVlPSIyMzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjA5IEc9MjI1IEI9MjQyIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyMDgiIHhtcEc6Z3JlZW49IjIyNSIgeG1wRzpibHVlPSIyNDEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjQ1IEc9MjQ3IEI9MjQ5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDQiIHhtcEc6Z3JlZW49IjI0NiIgeG1wRzpibHVlPSIyNDgiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjQ3IEc9MTY2IEI9MTA2IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDciIHhtcEc6Z3JlZW49IjE2NiIgeG1wRzpibHVlPSIxMDYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjUgRz0yOCBCPTYwIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNCIgeG1wRzpncmVlbj0iMjciIHhtcEc6Ymx1ZT0iNTkiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9NzQgRz0xMDEgQj0xNjMiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9Ijc0IiB4bXBHOmdyZWVuPSIxMDEiIHhtcEc6Ymx1ZT0iMTYzIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTkzIEc9MTI1IEI9MTkwIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI5MyIgeG1wRzpncmVlbj0iMTI1IiB4bXBHOmJsdWU9IjE5MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNTUgRz0yMDUgQj0zMyIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyMDUiIHhtcEc6Ymx1ZT0iMzIiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjA5IEc9MjExIEI9MjEyIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyMDkiIHhtcEc6Z3JlZW49IjIxMSIgeG1wRzpibHVlPSIyMTEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9Ikdsb2JhbCBDb2xvciIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjUxIiB4bXBHOmdyZWVuPSIyMDgiIHhtcEc6Ymx1ZT0iMjQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MCBHPTc2IEI9MTE3IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSI3NiIgeG1wRzpibHVlPSIxMTciLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTA0IEc9MjA0IEI9MjI5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIxMDUiIHhtcEc6Z3JlZW49IjIwMyIgeG1wRzpibHVlPSIyMjgiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MjUyIEc9MTc4IEI9MzEiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjI1MSIgeG1wRzpncmVlbj0iMTc4IiB4bXBHOmJsdWU9IjI4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJQQU5UT05FIDI4MiBDIiB4bXBHOnR5cGU9IlNQT1QiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJMQUIiIHhtcEc6TD0iMTAuOTgwMzkyIiB4bXBHOkE9IjIiIHhtcEc6Qj0iLTI2Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJibHVzaCBjb3B5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDIiIHhtcEc6Z3JlZW49IjE1NiIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MTA1IEc9MjA5IEI9NTIiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjEwNSIgeG1wRzpncmVlbj0iMjA5IiB4bXBHOmJsdWU9IjUyIi8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTUgRz0xNjAgQj02OSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNSIgeG1wRzpncmVlbj0iMTYwIiB4bXBHOmJsdWU9IjY4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTU1IEc9MTg4IEI9MTU1IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI1NCIgeG1wRzpncmVlbj0iMTg4IiB4bXBHOmJsdWU9IjE1NCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj00MSBHPTQxIEI9MTA1IGNvcHkiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjQwIiB4bXBHOmdyZWVuPSI0MCIgeG1wRzpibHVlPSIxMDUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9NSBHPTE5NyBCPTIxOSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNSIgeG1wRzpncmVlbj0iMTk2IiB4bXBHOmJsdWU9IjIxOSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNTUgRz03MyBCPTk5IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNTUiIHhtcEc6Z3JlZW49IjczIiB4bXBHOmJsdWU9Ijk4Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTI1NSBHPTIwMyBCPTEzOCIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyMDIiIHhtcEc6Ymx1ZT0iMTM3Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTYxIEc9MTA2IEI9MjA0IDQiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjYxIiB4bXBHOmdyZWVuPSIxMDUiIHhtcEc6Ymx1ZT0iMjA0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJza2luIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDQiIHhtcEc6Z3JlZW49IjIwNyIgeG1wRzpibHVlPSIxOTEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9NDEgRz00MSBCPTEwNSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNDAiIHhtcEc6Z3JlZW49IjQwIiB4bXBHOmJsdWU9IjEwNSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yMTQgRz0xODQgQj0xNDEiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjIxNCIgeG1wRzpncmVlbj0iMTg0IiB4bXBHOmJsdWU9IjE0MCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNDAgRz0xOTUgQj0xNjgiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjIzOSIgeG1wRzpncmVlbj0iMTk0IiB4bXBHOmJsdWU9IjE2NyIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj02MSBHPTEwNiBCPTIwNCIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNjEiIHhtcEc6Z3JlZW49IjEwNSIgeG1wRzpibHVlPSIyMDQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9ImJsdXNoIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSIyNDIiIHhtcEc6Z3JlZW49IjE1NiIgeG1wRzpibHVlPSIxNTYiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IlI9MyBHPTIyNCBCPTE5NyIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMyIgeG1wRzpncmVlbj0iMjIzIiB4bXBHOmJsdWU9IjE5NiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj01IEc9MTkzIEI9MjE0IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI0IiB4bXBHOmdyZWVuPSIxOTIiIHhtcEc6Ymx1ZT0iMjE0Ii8+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJSPTcwIEc9MTcyIEI9MTk1IiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI3MCIgeG1wRzpncmVlbj0iMTcyIiB4bXBHOmJsdWU9IjE5NSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yMyBHPTIzIEI9NTEiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzp0aW50PSIxMDAuMDAwMDAwIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzpyZWQ9IjIyIiB4bXBHOmdyZWVuPSIyMiIgeG1wRzpibHVlPSI1MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj02MSBHPTEwNiBCPTIwNCAyIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI3MSIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjE3OCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj02MSBHPTEwNiBCPTIwNCAzIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6dGludD0iMTAwLjAwMDAwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6cmVkPSI3MSIgeG1wRzpncmVlbj0iMTA1IiB4bXBHOmJsdWU9IjE3OCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj00MSBHPTQxIEI9MTA1IGNvcHkgMiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iNDEiIHhtcEc6Z3JlZW49IjQyIiB4bXBHOmJsdWU9IjEwNCIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iUj0yNTAgRz0xNzYgQj0yOSIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnRpbnQ9IjEwMC4wMDAwMDAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnJlZD0iMjUwIiB4bXBHOmdyZWVuPSIxNzYiIHhtcEc6Ymx1ZT0iMjkiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDxyZGY6bGk+IDxyZGY6RGVzY3JpcHRpb24geG1wRzpncm91cE5hbWU9IkdyYXlzIiB4bXBHOmdyb3VwVHlwZT0iMSI+IDx4bXBHOkNvbG9yYW50cz4gPHJkZjpTZXE+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0wIFk9MCBLPTEwMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM1IiB4bXBHOmdyZWVuPSIzMSIgeG1wRzpibHVlPSIzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz05MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjY0IiB4bXBHOmdyZWVuPSI2NCIgeG1wRzpibHVlPSI2NSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz04MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9Ijg4IiB4bXBHOmdyZWVuPSI4OSIgeG1wRzpibHVlPSI5MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz03MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEwOSIgeG1wRzpncmVlbj0iMTEwIiB4bXBHOmJsdWU9IjExMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz02MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjEyOCIgeG1wRzpncmVlbj0iMTI5IiB4bXBHOmJsdWU9IjEzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz01MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE0NiIgeG1wRzpncmVlbj0iMTQ4IiB4bXBHOmJsdWU9IjE1MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz00MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE2NiIgeG1wRzpncmVlbj0iMTY4IiB4bXBHOmJsdWU9IjE3MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz0zMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjE4NyIgeG1wRzpncmVlbj0iMTg5IiB4bXBHOmJsdWU9IjE5MSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz0yMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIwOCIgeG1wRzpncmVlbj0iMjEwIiB4bXBHOmJsdWU9IjIxMSIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz0xMCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjIzMCIgeG1wRzpncmVlbj0iMjMxIiB4bXBHOmJsdWU9IjIzMiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09MCBZPTAgSz01IiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjQxIiB4bXBHOmdyZWVuPSIyNDEiIHhtcEc6Ymx1ZT0iMjQyIi8+IDwvcmRmOlNlcT4gPC94bXBHOkNvbG9yYW50cz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOmxpPiA8cmRmOmxpPiA8cmRmOkRlc2NyaXB0aW9uIHhtcEc6Z3JvdXBOYW1lPSJCcmlnaHRzIiB4bXBHOmdyb3VwVHlwZT0iMSI+IDx4bXBHOkNvbG9yYW50cz4gPHJkZjpTZXE+IDxyZGY6bGkgeG1wRzpzd2F0Y2hOYW1lPSJDPTAgTT0xMDAgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjM2IiB4bXBHOmdyZWVuPSIyOCIgeG1wRzpibHVlPSIzNiIvPiA8cmRmOmxpIHhtcEc6c3dhdGNoTmFtZT0iQz0wIE09NzUgWT0xMDAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjQxIiB4bXBHOmdyZWVuPSIxMDEiIHhtcEc6Ymx1ZT0iMzQiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MCBNPTEwIFk9OTUgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMjU1IiB4bXBHOmdyZWVuPSIyMjEiIHhtcEc6Ymx1ZT0iMjEiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9ODUgTT0xMCBZPTEwMCBLPTAiIHhtcEc6bW9kZT0iUkdCIiB4bXBHOnR5cGU9IlBST0NFU1MiIHhtcEc6cmVkPSIwIiB4bXBHOmdyZWVuPSIxNjEiIHhtcEc6Ymx1ZT0iNzUiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9MTAwIE09OTAgWT0wIEs9MCIgeG1wRzptb2RlPSJSR0IiIHhtcEc6dHlwZT0iUFJPQ0VTUyIgeG1wRzpyZWQ9IjM0IiB4bXBHOmdyZWVuPSI2MyIgeG1wRzpibHVlPSIxNTMiLz4gPHJkZjpsaSB4bXBHOnN3YXRjaE5hbWU9IkM9NjAgTT05MCBZPTAgSz0wIiB4bXBHOm1vZGU9IlJHQiIgeG1wRzp0eXBlPSJQUk9DRVNTIiB4bXBHOnJlZD0iMTI3IiB4bXBHOmdyZWVuPSI2MyIgeG1wRzpibHVlPSIxNTEiLz4gPC9yZGY6U2VxPiA8L3htcEc6Q29sb3JhbnRzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6bGk+IDwvcmRmOlNlcT4gPC94bXBUUGc6U3dhdGNoR3JvdXBzPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PreSaiQAAOf3SURBVHja7N15fBt5Yffx72gk2ZLvK3Yc584m2fvCC3jZZYFtuMJVeDi6fTjbR5RCoS0FalooFLKwQEtLaTEtBQotx5ajkHKYLLvL7mYPsffmvh3Zjo848W3LOp4/Rt44iQ9JHkkj6fPelzaJLY1mfvMbzcxXv8OIx+MCAAAAAABAZrkoAgAAAAAAgMwjhAEAAAAAAMgCQhgAAAAAAIAsIIQBAAAAAADIAkIYAAAAAACALCCEAQAAAAAAyAJCGAAAAAAAgCwghAEAAAAAAMgCQhgAAAAAAIAsIIQBAAAAAADIAkIYAAAAAACALCCEAQAAAAAAyAJCGAAAAAAAgCwghAEAAAAAAMgCQhgAAAAAAIAsIIQBAAAAAADIAkIYAAAAAACALDAoAgAAAKDwBIKhayX9jqQrJdVLikgakrRX0qOS7utobZmmpAAgewhhAAAAgAISCIZeJekTkq5d4qljkn4h6RuSft7R2hKj9AAgswhhAAAAgAIQCIYqJf2bpP+TxssPS/qCpH/vaG0JU5oAkBmEMAAAAIADBYKhGyVNdLS2PJ7Ec1sk7ZK0ZZlve0TSn3W0tvyEPQAA9iOEAQAAABwkEAx5JX1H0u/O/qijteWrizy/RdJ9ktbZuBr/I+kPO1pbBtgjAGAfZkcCAAAAnOVbOhfASNIXAsFQ3XxPDARDtbLGdVln8zq8RtLTgWDoFnYHANiHEAYAAABwiEAw9E5Jb7zgx+WSfn+e55ZK+qmkyzO0Oo2SdgWCoXezZwDAHoQwAAAAgAMEgqEGSZ9f4NfbL3iuIWtWo7YMr5Yp6V8CwdDH2UMAsHyEMAAAAIAz/LWkmgV+d3MgGPLN+ffnJb0pi+v2N4Fg6BPsIgBYHkIYAAAAIMcCwdAaSYt1+/FKujLx3E9I+rMcrObHAsHQe9lbAJA+QhgAAAAg9z4iybPEc14aCIbulPSxHK7nPwSCoZewuwAgPUxRDQAAAORQIBhqknRMUmmerHK/pGs7Wlt62HsAkBpawgAAAAC59UfKnwBGklZI+s/E4MAAgBQQwgAAAAA5EgiGrlFuxndZrlskvYs9CACpIb0GAAAAsigQDG2U9E5Jb5G0Po835YykrR2tLf3sVQBIjpsiAAAAADIvEAy1SPqcrKmlC+HL0BpJ7ZI+wN4FgOTQEgYAAADIsEAw9FJJd0qqKLBNC0u6pKO1pYu9DABLY0wYAAAAIIMCwdAGST9U4QUwkuSV9EH2MgAkhxAGAAAAyKw/kOQv4O17eyAYKmc3A8DSCGEAAACAzGou8O2rkDXIMABgCYQwAAAAQGYdKYJtfDO7GQCWRggDAAAAZNZ/SooX+DbeHAiGatnVALA4QhgAAAAggzpaW45K+laBb6Zb0i3sbQBYHCEMAAAAkHl/Jqm3wLexjd0MAIsjhAEAAAAyrKO15bSk7ZImCngzr2FPA8DiCGEAAACALOhobXlM0kcKeBPXsZcBYHGEMAAAAED2rCngbatn9wLA4ghhAAAAgOx5NUUAAMWLEAYAAADIgkAwtFHS5gLexGn2MgAszk0RAAAAAFnxogLfvkOZfoPWW7ebktZLukzSVknrXC5Xo9s0KyUZsXh8MBKJ9Ei6V9L/BnftjFDtADgJIQwAAACQHbcU+Pb9zO4Ftt66vVHSjZKe7/V4XhSJRK6MxeNeSaqprpppaV7pWlFfb5aWligej2t0dEy9/f2RI8dOfMDjdne33rr9LcFdO++n6gFwCkIYIEcCwZAhySPJTByLpqwugrN/znJJis35d0xSdM6fkcSfMx2tLXFKFgAAx7qpgLdtSNLXlruQ1lu3lyTK6aVer/dV4XB4iyStXtUcvfaqy80rtm7RpvXrtH7tapX5/Z6F7nF6+/p1x5e+surBR357T+ut218e3LXzV1Q/AE5gUARA5iUCF5+kUkkliT89GXirGVn9sadmHx2tLTH2AAAAOb8WWCfpWDqv9ZmGJqOO/p6lX9LLE1Nwp6z11u3lkl7qcbvfGIvHt0ejUX/TiobIjc9tdT/3+mt03VVXqLKiIuXlxuJxtf/tZ+K/efCRsUgkcklw186+VJcR/vHq+mGz/sY7q/684UnfLdWJa62HOlpbHqZWA0gHIQxyeTFy4cDQ8UJqyREIhrySyiWVyQpdcnW8TUqakDTe0doyRc0DACAn1wX/V9J/pPo6lyF99uomHRgJa/fghPaOOO5U/oCk2zpaW06k8qJE8PIar8dzWyQavTUej3su3bwp9uKb2lwvekGbVq9qtmXlxicm9Lq3/mF0ZHTsXx/u/MkfLfbc8I9XG5I2SLpK0rWStp5yr9v01brPbRhwt1Rd8PRHJP1BR2vL09RuAKkghEEmLzZMWa0+SiR5ZbX8cCceC83MFde5LjYzOteyY7qjtSWcB9vslVQpqUKZaemyXBFJo5JGOlpbmMEAAIDsXSP8vaQPpPq6TeVefXBrw7P/PhOO6rdDk3rk9LhOTuZuzNnIxHjc7fO/X4bxzx2tLdFUXvu8l77mU5I+GIvFvNddfWX8JTfd6Hrhjc9TQ11teisTjyg++KBG+x7Rb11X6yFdoYmooYYSU9fX+HTs3l/py//69XAsFlsR3LVzWJLCP15dJStsuVLS1XP+Xpa49uw5XHLt2X+s//K18YVvmcYlvbqjteXX1HAAySKEgZ0XF4Ykf+Lk5ZcVvNgpKqtVx7isVh0RB213haRqWS1e8sW0pGFZgQxdlgAAyOz1wj2SXpjq67Y3V2h7c+W8vzsTjurJs1N68syEDo5OK5qFS3t/NKwjnTvV//BvFJ2e2hzctTOlGZFab93udrvdI9u3vcQXeNttqqutSfHq5bTiI/sVH9mn+PBexUcPSPGYBsxmfa70w5owyi56SZM7qsnvflBvXPf0D69aOe6RFbisXeRd9o67qjztK392SWzB7w2fNSaptaO1ZT+1HEAyGJgXdlxU+GW1/iiXlj5TLYOZeI/yxPtOSRrJVYiQ6E5VIyt8MfNw15VIWiGpPhAMDUs645RgCwCAAnTNfD/0ugy9rqVSN9T65XYZeurslO48eVYjM9alzdbKhb/fqfGaumVFmW5ZUaZIPK7j4zM6NDqto6NTOjo6rfG4PaFMgyumK+vK1FpfrnVlXr31G4fVOz01u02pTku9MRKJ+F77ipcuHsDEIoqPHkwELnutP4f3SdMD5z3NKN+oIc9q/a3vb7RQYHIqYqr6de1aNfDu31V0fKn1e0bSpf9c9/cDseQua8slfTcQDLV2tLbMUM0BLIUQBssJICoTIUSuut2UJh4NgWBoJBEihLO07TWJh6sAduezYVIgGDorwhgAAOy+dlgvqeqiC3HD0Ac212tD+bnGw621Pq0r8+gz+wY0HY1rXVlyl1luw9Cmcq82lXulldYgtuORmHqnIuqbimhoOqIzM1GNzMQ0GY1pMhrXVCSmuOJyu1wqNQ35TJcqPC7VeEzVl7i1yudWi98jn3n+5c6WTRt14PBRyWpRcmeKxVEnSTXV54ojPtUnjexTfHjfudBl9IgUX/xyxKi+UrHxk/r7yn/UUoHJWbNBX627Qx8ceKc88UUvFxtCns1PdnkvvS6Fbbpa0nsk/QO1HcCSn9cUAVK8iDBktfyolXNafxiJC5uqQDA0Kul0JsKYxLZXJS4ezALcvYbOhTFDkoaY8hoAAFtcPt8PX72q8rwA5tkUoMStN62u0r0D43Ib6bdmKXO7zgUzNlrT8uyguRtSfe1rrzhdMRM15Dv6OUUOn1R8ZJ8UPpP6SnhrFR/eqweq36ozhjWWTPPMEUUNUyWxSfV51mra8J/3kh7PRv284l169ci/LLTU/ZK2/rjqfem0aPmLQDD0Zb7IArAUQhikEkJUSGpweL2pkFSRaNFxOtWB4hbZdp+kRtk/zo0TGbKCpqpAMDTQ0doySu0HAGBZLgorarymXtJYtuALbqjzazTizCHbVq1sWnC7FpKYeehv4gq1G5LU/z0t55ueWOlKxWMz+m/fO579WVyG+tzrJEne+JRWzhxVr+f8Vfx1+Vt00/gPVROdd7bqsbhcwwdLrmtJp1gkvUbSD6juABbjogiQRADhCQRDLZJWKn+Cu2pJ6xLB0XK23RUIhholrVZxBDBzuSWtDARDzYFgiMAWAID0rbvwBy9sKJO5RCuXq6udOd7/nBBmUwov+6Skjxk2XEvGJUXOHNARY7OihidxUxPTKc/6Z58TNkrV69mglZFj5702anh0d/lbFlp0S5977dF4GrdI8WhMY6GB91LVASRzkwUsFkJUyhq8NR8DOzMRIpRL6k+1VUxiwOEmjhOVS/IHgqE+WsUAAJCWi1qMXFvjW/JFtV5nXoI0rnh2yuz61lu3e4K7ds5IUutLtpdLqk88ahOPuuetHa2Xjrbb9f79ExVq9I/qybJzk03VRbo14F593vNKY+M641px0esf8b9Mrx3+R7l0XkujGUlNx7xXdKW6PmM9gzr91BHJZdwUCIZczDoJYDGEMFgogDBkdb+pLIDNqZDkCwRDPR2tLVNJbv/sxQMsLlmBVpmsQIuLCwAAkrdu7j9qvKYaS5e+DHcZzlj5YydOau+Bgxo6c1ZnR0Y1PDKqOX2Jnml9yfZKWV2Z5x1F+Jrmsadk4xd6I9MerfAbesT/imd/5o9d/D1RVXRQfZ7zZ6KOx+PqPjqqp3zX6xoF5/5qQFJzn2dt0i2fwyMTGnzqsCb6nx3TxhzrHniOpEeo8gAWQgiD+QIIj6RmWVMYF1JdXx0Ihvo7WluGF9l2U1a3Kz81YV6VkkoTgVaY4gAAICkNc//R4vPkxUofPHJUn/niP+uZfQcWe9rmxX5pSGNvvGbwSjvXy6WoonJryjg3pk7cOD/jmW88mMn+Mxp46rDCIxO678rn6Rr/eSHMsKTmQbOlbKn3j81ENLTvhIaPdCseP39km5nRyTYRwgBY4sYUmBtClMgaWKwQ64YhqTEQDHk6WlsGi2zb7eSVtCYQDPV2tLaMUxwAACypZu4/6kucf6lx+Ohx/eH7P6zJqallLaelevpwiTt2jZ3rVuqOaMZ1/ng500bpnAu+uEZd5xo0z0xM6fRTRzTWc+7y79Doygu/clu6lW9cGjlxSqf3HFV0ev4JlKIzM1dQ3ZEvLgwR8+KGzjDyvtwZmBdzQwi/rAFoCz2EqA0EQ00XbHtZkWy7nZ8dqwLBUDVFAQDAotdXJZLOGwCmzO3sm4hoNKq//NvPLDuAkaTnrB6bsXv9yr1RzVwwX0J0Tk+olplDGjOrFY/GNLTvuLp+FTwvgJGkM1MXjcnjlaTS+Ni8LX2nhkYUuucx9T92YMEAxrqrFddGABbFDSdmLxD8slqBGEWyyZWJcW9OyRozpolakJYVgWDIPV/LIgAAIOmCVjCS5HU5+3vQXfferxMnu21Z1vraKdu7t09HXSpT5LyfRYxzIcywWaux7gENPn1UkYn5g6SJqYv2QakklcfOnpewRKfDOv3MMY2cOJXcyhkG91cAFsWHBIoxgJlVIetbjxJqwbLUBoIhs6O1pY+iAABA897czxWOObsLwK/uuc+2Za2sDJfZvX6xWFxzRwaWJHfcyk78Z09o39NnNTlwdvFlXLwLmiSpZeZQWJLisbiGj3RraP9xxWZSmmBzhioPYDGEMEUu0US2WcUXwMwigLFHVWJKxl6KAgCAxY1HnD3J4IFDR2xb1uSMy/ZQYmwqrvqKyfN+ZoQnNLj3cGKw3KWXEY9e9CSPpImVM0fNib4zGnzqsMKjEymvm8ttnqCGA1j0c4IiKF6BYMgtqwUM9QB2qAgEQ40UAwAAi+ubijh6/QZOD9m2rNFp0/YQZmI6Jnd8RmY8Yg2We7xXj/76lM4eTi6AkSSXOe+PjwwOaWPPA0+lFcBIkrvU+zQ1HMCinz8UQXFKjIfSLFpDwV5VgWConmIAAGBhoUln91hx2ThmzZHB0inb18+wWhI19AV18p7H1P/YQYXDqbUuKiud9/nhS8uOV7tcRlr9xUyvR/7G2p9QwwEs+hlGERStFZqnjzJgg9pAMFRFMQAAIEm6qEnFyExU3Q4OYlbU19m2rH39ftu7vLdUW2O0dD0zoOkzo+ldrJROzvfjTV7XTHxLbX9aTYFKaiqGvvbCjWeo8gAWQwhThALBUIUkbpKR0eu3xIDPAAAUu3lvyh85PenYFb508ybblnVowLfG7vWr9sd1etyl51U9lfYyrqqYd9ybKklPvXPFD73pLLOkuvwXVHcASyGEKTKJcWBWUBLIMENScyAY8lAUAIBi1tHaMiNp/MKf3z84rqmoM2dJetFNbbYtKxIzVjwWKu+2ex27zxh6Zd3utK9SXlJ270K/rbui4ljFmprxkVQW6faVxMuaav+CGg9gKYQwxWeFJJNiQJY+X5oT4w8BAFDMTl/4g/FITD8IDc/75FzPYP2Sm2/UutUtti3vnx5o7rN7Hbc2G6r3Duv6hq6UX9vQ4NY6LTgDVIukx/9m7T+7XWbyY8NUrF6x85svu7yHqg4gmZskFIlAMFQmqZySQBaViJZXAAAcn++H9w2Mq/PU2Hk/m4nF9ZOekZyurGma+tRf/YXK/Pb0LD7Q77t27yl/r53r6HVFZNZcoUDzj5TqOMKvX3nfUk+5cmXJ6YH3rP/pqWSW52uoHqva1PJmqjmAZDAzTpFItEZooCSQA1WBYGiio7VllKIAABSpo5Junu8XPwwN6/Ezk7qyulTT0biCQxMyDUOvXVWZ0xXevHGD/u0f79AXvvxV/fbxRcde2StpQNKgpCFZrX6GEo+B2X973bFLJP3AzvuP+PAeralp0JvXP67/OnJtUq9ZscLUa0r/J5l7pLpX1t1/diRa3vOt4y9qji8w93VJdXm4euOqm75204YJqjmAZNBNoEgkZqtppCSQI1FJJzpaWyJz6qQpq2ucIatVnpF4xBOPqKSYpGhHa0ucIgQA5PF12EclfSrZ55uGoS9d1yyXQ67UzwwPa2DQ6lFVVVmprlC3/vhDfyVJJ4O7diY98G74x6v/r6Svy86u8SV1iken1X7kj/XEqZpFn+ouccf/5orvfe96d3BU0uzgu26d31K8Uud6C7glTT05dsnln+9+R9XgWZdv9kkuj6ny5oY95atXvOJbr7yyi1qOfLRQuOjoAMPI/wiDljDFceI3JNVSEsghU9KqQDAUkeRJPIwU6nBE0oyksKRpSVOSpglnAAB54plUnhyNx9UzOaMWvzPGt6+pqlJN1bmJNZ94es/sX4+nshzva09+K/zj1Qcl/ZWkl0jyLXvlpk/LVdqoT13ydX3K9ft6qGf+XtBmiUcl5ca7n/+GH3411bcI/1irvrWl/QW/Cd+8+b+n3uA+41550tdQ9b/f+J1Le6naAFJFCFMcKhM3vUAulSQe6X5WuS+4WIsHgqEpSROSxjtaW6YoYgCAQz2S6gv2jUxnLYSZisYVjcfPm63JaxryGIZKzYu/M+npe3ac3eOpvpf3tScflvQqSQr/eHWVrC9lTEkVkvTl3Ss3P9JV9Yu3v+X1xu+88AVSLCxFZ0/xccVn5vRujk5IMauRrTc6qU+sPqF79h7R90LX6/hQiWKxuHzlPjXVl2r/L7871fnD//hqOuXjfe3Jbknfk/5T1gMA0kcIU8ACwZBPUr3s+JYBcB4jUbd9kuoCwdCMpFFJIx2tLWGKBwDgFB2tLb2BYCgka+adpDwwOK5bm8rTHjtgJhbX6XBUp6cjGgpHNRSOanQmprMzUY1FYhqZiWoyGtdkNLboclyGVO52qaHErcZSt9aXeXW0/8zsr48sp1y8rz05d3qoxAxSJ48/d9urv3nHN+79v89/8e+bFVVlF538F/OSK6wmNvG4NNtr4TP/8GXtmxp7hpoIwAkIYQpQIBjyyBqEl5mQUEw8srrd1QaCoUlJZxkMGADgIPdLSnoGnVNTEf3y1Khe1lSx4HNical/OqK+qdnHjPqno+qbimhkJmrLSsfi0shMTCMzYR0ZC2v34IR043Ztatig0489OKBdO20vqFgs9pHxiYk3fe3b3/F94N1/kNYy5g4bsffAoWg4HH6QKgjACQhhCkhi7JcaSXVi0GUUN58kXyAYqpf1zdoo48cAAHLs50ohhJGkH4dGdGY6qufX+1XicmkwHFHvZETdkzPqmZxR72REkRwNrFm5+TKVrmjaoi983PZlB3ft7Gu9dfvHvvujn97xule+3Fi7elXay4pEIjp87IRL0hNUQQBOQAhTIALBUImkJqU/5gZQiDyJ46IuEAwNdLS2jFEkAIAc+Zms2f9S+qLs3oFx3Tsw7sgN8lbVnM3g4v/RbZrv/fyXO9Z86TOfTPvLxcPHTigSiRiSfksVBOAELoog/wWCoRpJa0QAAyzEI6k5EAy1JLrrAQCQVR2tLYOSdhfURhlGxrr9BnftDIdnZgIPP/q4cddvHkh7OQcOH5HL5ZqRtJdaCMAJCGHyWCAYcgWCoWZZ47/Q/QjFxkh8hpnzPGZnU7rw5xWSNgSCIaZsBwDkwjcLbHuGM7nw4K6dvzRN84df+PJXoxMTk2ktY9/BQ/J43HuCu3ZGqH4AnIDuSHkq8W3+KkleSgMFxpDVcsWj8wOV2VDFpeWHjmsT01v3SZqWFJnzmEk8wh2tLVywAQDs9D1J/6DCmblyONNvEI1G3zd09uwr/+3b3zH/5P+9M+XXP/bUnsj0dPgeqh4ApyCEyUOBYKhUVgBjUhrIc6asbnQlOhe8ZKu7UKmk1ZIGJE0ucKzFJIUTj6nEY5pBfgEA6ehobRkJBEPflfSOAtmkoSy8R1UsFivZtGF9yi+cng7rxMmQW1KQ2gfAKQhh8kwgGCqT1Cy6HyE/eWWFHyWJP3MdJLokNSYuIkcW+H1p4lGZ+Fk8EAxNywpkJiRNdrS2RNm1AIAkfU7S2wvkWu5EFt7j9xvq6yIve8ktKd+3lJR45fF4ouFwuJxqB8ApGBMmjwSCoXIRwCC/mJLKZY1btCZRf2sllclZLblqZU3tngxDVihTndiejYFgaE0gGGoIBEN+djkAYDEdrS37JP1PAWxKXFJXpt+kpMT75hff1OZ2Geld/jY3NcYkbaTmAXAKWsLkiUQLmJUigEF+fK74ZYUv+TRmUYWsYHowcWGZitnWMjWBYCgqaVzSmKRxui4t+7PPLauL2tyBlmcHZJYu/jIhNufPmKTonMeMpEhHa0uMkgWQYx9TPP5aGXl9WXe0o7VlOpNv0Hrr9obp6fCG5153bdrLWNvS7OkKdW+iygFw0s0SnH8T4hctYOBspqzWLfkWvFyoLHFT36/Ug5i5ZVGZeMQCwdCYpJGO1pYJqsmin3NenRsfaPbvngy9V1TnxvqZTjymCMwAZMtjf/nu4TW/+/uqb31BPm/GU1l4jxsk6fKtm9NeQHNTk7wez1ZqHQCnIITJjxsTAhg4kSFrdofyxJ+FUkd9srpP9duwLJcSgUwgGIrIGndmuKO1ZYbPtlCprBZTPmV/fCAz8b6+C9ZpWtYgzROSJmgxAyCDXt/b+RPVX/0cyVualTdc4/dopc+jvqmIhsJRTUZjmolZ2bPPdKnGa6rZ59bWihJNx+K68+SSEx89noXVfk59bW2kproq7XuW5qZGRaLRFqocAKcghHH2TYopaxYkxu6Bk5iyuu5UqHBn6PJLqpfVNcnOz9taSbWJ1jFni6l1TCAYculcaym/Q+vObEuc6sQ6T8nqVjbW0doS5tAHYKPfnRkb0ZaRbh2oz85wJc+p9WtbU3Lj0/ZNRZIJYe7L9Dq7XK7LN65fu6zzRdOKBkUikcrWW7eXBXftHKfqAcg1Qhhna1b2pusFluKRVJW4kS6GllnlssYQGc7QsssDwVBY0hlZ3ZUKritMIBgyEvWlMk/rzexYP/WJVjKjiX0V4eMAQLpab93eIKlNkt549Wb9z7hHT52dyvj7TkWTb9xXX2LK0KL9cqclPZTxGxW3+4p1a1qWde5oXNEw+9c1kvZRAwHkGiGMc29e6nVBU3kgR7yyWgYU48w/NZIisgbazVTZNkqqCwRDQ7K6KuV9GJPoRlklK3wplNZSs61k6gPB0ISscG6McWQApOHlklyb1q/TqpVNelskph37+nV6OprRN+2ZTL4nrGkY8pkuTSwc3Nzf0dqS8eQoEomsX72qeVnLWNm4Yvava0UIA8ABCGGceQPjl9VtAcilYg5f5qqXNYBrJsdxcUtaIaur0hlZXZXy7uY+8dlVI6vVSyHzJx6RxP4aZvwYACl4qSQ9/4brJUllbpf+cEOtvnBg8NkxWjJhz8i0hmeiqvIkl41PLt5y5r8zXUitt26vi8VipS0rVy5rOVWVFfJ6vbFwOLyGqgfACQhhzt08uGSNveKSnm2BGZMUy+bFdWI9mtgjyPHnQjHcSCfLkDVQb6/SnzEplbJvkFQdCIZOd7S2jOTJ52e5pDpZLUWK7VhpkNWS6aykMx2tLVEOGQCLBAsuzYYwz7nu2Z+vK/Pqnetr9NUjQxk70czE4vrGsTN67yV1MpeYGnsoHF1sPSLKQggjqUWSGlfUL3tBK+rroqGeXgbnBeCYC8iiEgiG3Do3K4ZnzsNY5DVxWd+Czz4mJU1maFyABhGOITdcOteFhNm4zueVFUwNZen9PJKaAsFQjaQBpw7gGwiGymS1FCrh2FGtrPDsrKQhWsYAWMBVkupKSry6+orLzvvFtTU+vXlttb5z4mzG3nzfyLT+8eBpvWN9jaq9C7eIefj0oqedn3e0tgxmoaysEKZh+SFM44oGM9TT20z1A+AERXGzn2giXyGr+Xg6A90aiZswb+Lf1YnlzsiaynTUjpukxJStVVRL5EBFImRgJq6FVSaO96ksvmeJpJZAMDQqK4xxxICwgWCoRFZg7KdanGc2jKkKBEODHa0twxQJgAvcLElXXXapPO6LL8Nf2GA1Qs1kEHNgdFp//Uyfbqz367l1fq0r8573zcuTZ6f0897RxRbxpSyV1erSkpJoeVnZsscWa6irdXm93vVUPwBOULAhTKLFS3XixilT2zk7W0xVIBiKSBqRNZZDujdKK6iSyDKPaMmQijpJPcp8t6QLVUgqS9zYn83Vxie6S9YnPluxMFNSYyAYqpbU39HaMkmRAMUtEAzVdbS2nFYihLn+6isXfO4LG8pkGtJ/Hj+b0a5J9/SP657+cflNlxpL3SoxDQ1ORzU4vehlbLCjteVXWSq2htqa6qhsGOB9RX29DEOrqYkAnKDgQphE+FKn7HepcMv6BrQmEAyNSDqdShgTCIYqZU2FCmSDoUSAKLoepcKT+GzJRQsHl6QVic+Kvo7Wluksf7aWywqK6S6ZvBJJqwPB0LCslkx0UQKKTOKz80uS3vz/Hu76k8c/+p4XStJ1i4QwkvSC+jJVuk197eiQpmOZzf0nojEdGw8n+/SPZrH4mmqrq21pobuivlaxaKyRGgnACQqm60EgGHIlpnVen+Mby9mb2/WBYKgh8c3xUutuyAqOgGzwSmqW1ZqBACZ11crttMulktYkxovJxmerGQiGmhN1hgAmPVWS1iXG0AFQJALB0CpJuyW9XVKp4XJ9teWVb6j3er26bPOmJV9/VXWpPnxpgxpKHPPR+8MstoKRy+Va0bii3paNr6ut1UwkUtl663Za/gLIuYIIYRIXtutktURxyk2lIWuMjWQuvCuU3lg1QDo3gyupb8s+tqscsA4NgWBodSAYyti+THx2rZVUzm5fNrekVYFgaEUieAdQwALBUIukeyWd1+RlxQtu1RXv+hO5PMl9dDf7PProZSt0Q13Oh+AakPTubL6hx+Nurq6y53Q7Z3DfldROALmW1yFMIBgyAsHQCkmr5NxvaGcvvBsXaRVTS1VEhpmypj6vEa1f7FCh3LaGmeWTtDbRRcnuz9YGh3+25qtqWS2ZvBQFUJgCwVCVpF9I2jjvE9Zs0pcOntZkNLkeiqWmoXeur9EfbqxVpScnl+4RSW/qaG0ZyOpNiuGqr6yw5zuAmupnw5wmaiiAXMvbECbx7e8a5c8AkVWyxgbwXLAdfp2bdQnI1I36KjHmkJ2c0Bpm7ud4UyLoXXbAlhhXq0VWYIfMKJEVxNDCCCgwic/QH0m6fLHnHRid1hcODGp4Jpr0sq+v8enjlzfqxSvKZRpZ+z4lJuntHa0td2e7LGPxWFV5mT29OOtqnz2lNVBLAeRaXn7DmZjKeZWc8U10OhfePXNmy6imGiKDqqljGVMh6WziAtUJqiSVBoKh3o7WlnA6CwgEQz5ZTbVp/ZJ5LknNgWBoqKO1ZZDiAFL+vDISx5FLVjA++5jvC8Z44hGb82eso7UlEyPe/r2kFyXzxNDEjD67b0B/srleTaXJfeyWuV1645oq3bKiTD/qHtHjZzI6+dq0pLd2tLZ8Pxf7OBqNVVSU2xPClJaUyOvxxMIzM7SEAZBzeXehnRijoFn526XClNQSCIZ6JU1KYqBGZKqe1ctqBYPMMBLH76iD1mk26O3taG0ZT/GztVJSo+iulm21ia5JvRm6IQTyXiAYKpHVmrNEVuthrx3XsIFgKCopPOcxJWkq3WMxEAy9S9J7U3nNUDiqz+0f0B9tqtOm8uQbRq8odSuwsVahiRl19o3pt0MTsnkSpQOSfr+jteW3udrvkUjEb1cII0k11VXRvoFBWsIAyLm8CmESTbdXFsBNgiErSBrnhgcZ4EncTNOaIfMqNH8IY+rcN7Sz38rG5jyiGVwnl6xxqAY6WlvOJPnZWidmaMulclndVbs7WluiFAeKXSJ08c95ZOpayZT1ZcXcLyzigWBoWtJE4jGZTCgTCIZukPTP6azEeCSmLx4Y1NvW16i1NrXvTlr8Hr1zfY1et6pSuwcntPv0uE5PL+tj5Kykz0j6xzmttrOu9dbt1ZJkV3ckSaqtqTH6BgZXcIQByLW8uUlLtIAphABmLlrBwG4+SStEuJct3sQNglvWN7SexGOp8o9Lmkk8phKPGZvXrSHRwqJ/sRuIQDDUJKmSXZlzs1OPhzpaW2YojqIPIYzEZ8ns54o7ERjMBrxzP2PmhruRxCMsKdzR2hLJo232yQq2y3N8fWokjsdSWRMnxALB0JikMUnj832eBoKhGknf0zLG+IvE4/ra0SF1T1bo1c2VcqV4Fq/xmnplc4Ve0VyhkxMzevLspI6OhXV8fCaZAYAnJf1a0g8lfbejtWXCAVWiWrI3hKmrrXa7DIPuSAByLi9CmMQYMPncBQnIhnJZrRk4TrIrnW/VDJ1rUj97hRmR1TpuPHEDZYcqSZ7EOFSxeW7ymhI3PXAGj6wWMaF0x/VBfkocj7OtPnyywhc7BtqOyAp5JxMBQthh220mPqeqEvXfiVyygupKSdFAMDQqabijtWV6zr77pqR1drzZL3pH1TU+o3duqFG5O/X5MwxJa/werfFbxRmXdCYc1ac7vqk9Xd0qbWzubLrlZT+XNCxr2unDkg47MLCrlmwOYWpq5PZ4mKIaQM45PoRJjDK/ihtLYMmLlWqKIe8/j2dvRqYSF8h2NAX361xXl8icm4Zm0RrPqfVgNoiZpjgKV+I4LJcVhJZl6DrHnXiPclmt42ZkdaEczWX9SnQ3qklsez5d35mz59tAMDQp6YykgKRX2fkme0em9Ld7+vWuDTXaXFGyrGUZksriUT38i/9VOByWpI//z1/8wUN5UNZVkmTzmDCS1aoeAHJ+sef0C5Rm5d8sSEA21ScusFE4ZpvCT0s6reW3jCmZvbGX1eJmlaxwBs690WshiClMgWDIk7iRr9L8M/lkkkdWF5vaQDA0JWv8j9FsDQqdaNlcp8IIgH2SniNr/BTbDc9E9fcHBnVrU7le3Vwpjyv9rOqRx5+YDWC6JT2cJ+VbLUnlZfadqiorKiQr/AOAnHJ6S5j6xI0IgPk1iNYMhaxEVhA9Kusb1+VMh+2RtEZWoMOsWc43G8ScpGtSYUiM0VQn53QBLJXVJbE+EAydkXQ2U2FMInhqUGF9YeCXNR11xq6l45J+dWpMzwxP6ba1NSnNnjTXAw8HZ//6v8FdO/NlFrYqwzDiXq/XtpZSleXlikQidMEFkHMup65YYoA20mpgfoassUgIYIpDhawm1N5lLmd2JhDkh9kgxkNR5K9AMGQGgqFGWWOGOPEG0C0rIFkfCIYqbN52IxAM1Se2vdBabH5M0tpsvFHvZESf3z+g/zh+RiMzqc989GDwsdm/7syj8vWWlpTYOltcRUWZYrFYSeut270CgBxyZAiT6IbUyO4B5jUbwNCdpLh4ZAUxdD0rLm5ZU47TLTcPBYKhKknrlRjfIg/q2spAMLQ60Wpnudteltj2WhXeuH7bJb0u22+6e3BCf/10n3b2jGo6llyDllBPr3r7+iVr9qy786iMy71ej62tdirLnz191vLpBCCXnNoSplrL/8YXKFQNojVDsTJkddOspiiKildSc+ILCuSBQDDkDgRDq2V9oeTKs9X3SVobCIZq09x2V6LlzyrlySycKVot6RO5evPpWFw7e0b0kSdP6X+6RzQys3gv1UeffHr2r48Ed+0cy6d66PXaeytQWflsQy9a2gPIKcedHAPBkEtWn2kAF6sXLWBghTCGrHFiUBx8ssbv6KUonC0QDJUn9pUrjzfDkDVWjF/SqWSnL04MvLtSzp1u2o7r5i/IAS0SJ6Mx/bx3VL88Naorq0r13Dq/tlSUqOyCaa0ff+qZ2b/ek2dlXVLm99vbEqaCEAaAc04mTlOT5xcuQCaPDbqiYNZs9waCmOJREQiGpjtaW4YoCmdKjH9SSF0d/JLWBIKhno7Wlqkltr1G1hcFhdxi6/2SrnbSCsXi0pNnp/Tk2Smrr3KpW2vLvLq0skTXVvv09L4Ds0/dnW/nuNISr63dMCvOdUcihAGQU44KYRJNravZLcBFKpUfYwogyxepsvr5j1AURaM+EAxNdbS2TFAUjrt+KdQxm9yyprg/1dHaMrrAtjcmzlOFrE3SHzp5BeOS+qYi6puK6JHTE/pv86xGaxql7h5JeijPytvrK/XZ+qWs31cql8sVj8VihDAAcsppLU4qZc0GAWDOdYMYRA4Lq5U11SyKx8pAMOSmGJwh0Y16tQq7paKRqHc1F2y7mdj2Qg9g6iV9TnnWymc8GteG2wJa89rfO3Pd7V/Jt1aTZX5fqZGBhUZESxgAOebEEAbAOV5ZA/ECi2kQAXYxMWW1ukCOzQkhiiUIbQgEQ3WJbfdIWlME225K+qKsICYv1T/35hpJP0iM2ZMXDMMod3vsz5pLS0slqYxPLwC55JgQJvGtHjO+AOdf+DWqsPvXw766Uk8xFBXf7M0wcnbd4pLUIqmkyDa9LjH70RoV7gC8c/2FpNYC2I7XSPpZYrBlx/O43f7yMvuzkvIyv7jfAJBrTmoJU8HuAJ4128ee1g1I+qZcfLtXbOry6ZvtQpIYB6UYA5hZVUVyfnqNpHcU0Pa8SNJPA8GQ1+krGovHK03T/tsUX2mpS4yxByDHnBTCkEoDc26uZHVFAlJRK2aXKzaNiUAA2bVSjMVU6K6U9LcFuF0vlvQfTv/ccLlcLn+p/bcGpSUlLllj7QFA7j7jHLQuhDCApUJMRY30mKJVYbEpEQN3Z1UgGGrgM7rg1Uv6JxVuS6c3SbrDyStoGJkJSirKywzuOQDkmiNCmESzSLpdANxQYfkqxThCxaY2MUgqMn+9UiFmVil0HklfktRU4Nv5wUAw9B6nrlw8Fvd6vfY3CC4tKZHX4+E6C0gwDCPvHoXAKS1hSjgEAJmyZrnhBhrLrUd8S19k11CSVlAMmZUIuhopiYL3MUnXFcm2fjEQDL3AkR9qLsNV4rU/Wy4pKZFoMQogx5wSwvANHmCNA+OmGGADQpjiUxYIhhiYObOaxJhLhe4tkt5YRNvrkXRnIBhy3JT38Vg8I59nfp9PhsvgsxJAThHCAM65aWagONilRAR6xaiBIsiMQDBULcaRKHTXSfqrItzuJkk/cGCXRtPns/+Q8/lKJWYSBJBjTglhuFlAMXPLagUD2IlQr/h4A8FQJcVgr0Aw5JY1UCsKV52kLxbx9ejzJX3SSStkuAwzE1NUu01T8Vic7kgAcsrFegDzn/8TF2OlslqpVMoajLFO1rfNK2SNDbBynkdj4jn1sgbZrUoswyer1deF9Z1xYJAJTJ9bnOqZstr+MuU6paCZkr4gxvv5cCAYutUpKxOJRMsyMQBnaUmJZBgczwByyimJPx+GyBVDkjfx8CQe2ZitKyopIikmBqZGZhDCFO95vVLSMEWxfIFgqCRRnihc75XVEoTrIek/AsHQ1R2tLQNOWKHyMvt7Dbk9bhkGX3wByP3FmlM++IFsMBM3p6Wywg9PjuqfKaZlR2a5EnUsSlEUnRoRwtiFrqKF7bmS3k0xPGulpH+V9Npcr0g8Hs/YGDWGDK6/AOT8Ip31QKErTdyUNEtaLav7T4WsFi8EgOAzHoWGsWFsEAiGvGKmsUJWI+nzfE5e5DWBYOjtuV6JWCzmzdSyI9EoY6YByCmntISJsStgM5+sgUn9osUJipcpaYZiKEpNgWCoQtLpjtaWKYojeYkxdaoTN+koTIakz8ga3w0X+2IgGNrV0doSyuVK+DMxO1IpPXUB5J5T0n9CGNjBnbhoXi1rgL0KEcCAz3gUrzJJawLB0KrE2CZYQqIF0XpZLSaZubFwvUnSLRTDgqok/XuuB/k2XRmYHcnNYQ3AGTetThBnV2AZ/LIGTuTrDeB8dLeDZIUxZYFgaETSYEdrS4QiOV8ipGrkPFIUWiR9hGJY0u9IeqekrxXgtvEFHYCccsq3pFwQIp2by0pJq2Q1J+bCGZj/OAFmVUpaHwiGapnG2hIIhoxAMFQvaS3nkaK57r1DVpdlLO3vAsHQ6my/aeut2zPaci8SidAyEEDOT0ZOwJgFSOWmslLWN1m1smY3AgAk/xlaL2ltIBgq6sEpEwPvrkmcS1AcbpN0PcWQtEpJ/xYIhuqzHNxmLCTzlZK/AMg9Qhjk043D3PCFpqTA0ujqiYV4JbUEgqHGQDBUdGMHJcZ+WSOJO7Li0STpTymGlG2T9GZJ67Id3JaU2D9BkttkTBgAueeUT6JxST3sDizAL+ub24ik0xQHkLRpigBLqJLkDwRDpzpaWyaLYYMDwVCDmPmoGP21rPGRkLqPSdotyRMIhs7IGlsq4yG/x0NjZwCFyREhTGKQwDF2By64UPbKGu/FLyuAYewgAMjAvY6k1YFgaEjWlNYF2YIq0Z2imRvxonSLpFsphrQ1SHq/pE/LCjB9gWCot6O1Je9asodnaHwPIPeYvhSOvFAOBEO1sgZK9FMiAJAVtbK6KBVce/1AMGRKWi0CmGLklvSXFMOy/b6kyxN/L5W0JoPdkzLW5Xw6HGZPAsg5Qhg47UK5VFY//XoxswsAZJtP1qC9BRNWJEKlFjH7UbG6TdI6isGWe4ZPzrl3MCWtCgRDVRl4r4pMbojb7Z5gdwLI9Qcq4JQL5VpZ31QyUCIA5M7szVXej5sypwUM55XiVCnpvRSDba6Q9KY5/zYkNQaCoTqKBgCSRwgDJ1wkewLB0GrR+gUAnKQhEAytzPLUtHaeW1yyWsAwumfxepusIAb2+TNZA3rPVRcIhuopGgBIDiEMcn2RXCZr7BcfpQEAjlMha5wYM59WOhEcrRItYIpZjaR3UAy2q5QVxFyo1u4gxuO2f3iq8fEJuVyuSXYjgFwihEEuL5LrEhfJ1EMAcC6frNmT8qlFSaMI94vdO8RAzJnyRkmXzfPzWju7MZaW2p+hxuIxGQazbQLILW5+kXWBYMgVCIZWSaIPMQDkB6+s2VAc37IkMb4YXVCKm0/SWyiGjN4/fEzzdyFvCARDFU5d8cnJKRkyaAkDIOcfokA2L47dYppQAMhHpqwWMY6dZSgQDPlkjS+G4vZ6EcRl2rWSXrPA75qc+jkRjUZlGAbzVAPIKUIYZPPiuETW9NP00QeA/L1uaAkEQ34HnmNMSc3sIuqorAF5kXl/Ial8np8bkpqdOJbU1PS04vH4OLsOQK5PVEA2Lo79slrAuCkNAMj7a4dViVYnTtIoq7UOitvzZH3hg8yrl/THC/zOLWml01Z4YnJKccXH2HUAcokbYmRcIBgqT5yImX4aAPKXKWtsGE/isSIQDPVLmkl8vpuSYolHXFI08btw4s+pjtaWjAyIGQiGKjX/N/IoPq+nCLLqbZK+L+nYPL/zB4Kh2o7WliGnrOz4xITisfgwuw1ALhHCIKMSg7M1iQAGAPKNIalUkl9WN1LvPM9ZK6lXVsgiLdHCNhAMzUialDQhaayjtSVmw3nGlNTA7oKscWC2UQxZZUr6qKQ/WOD3dYFgaLyjtWXaCSs7MTGp8MzMaXYbgFwihEHGJAKYlZQEAOSVEkkVsgZQXypAd8kK2nulpKZ9nW1FUykpHgiGxiUNd7S2LGeMhjrRDQmWbZo/LERm3STpZkm/med3hqyugl1OWNGRsbGoJFrCAMgpxoRBRgSCobLEhTkAID/4ZQ1su1JW155kWzCaiZusVK8pjMT7rAoEQ+sCwVBlIBhKqdVkIBjySqpm1yHhZRRBzvylFg5DSwPBUJUTVnJ0dCwqaYTdBSCXCGFgu8Rgjc2iCxIA5IOSxGf2CqXfisCTeH26n/teWcH9usQ4YsmqY/choULWoLzIjQ2Sblvk9/WBYCjn9x3jExOSNMruApBLhDCwVWIa6lUigAEApzNlzW6yUvZ04SjV8kMRj6ypbVsCwZAnifNNBbsRCbck6g9y531auGWaKakm1ys4dHbYlDTArgKQS4QwsE0gGHLLCmCoVwDgbLMtFu2eUahc1ngvy+WX1SpmsS4MNexGzHEjRZBzlZLev9gxmxhIOymxWMzWlQvPzCgcDpuS+tlVAHKJm2XYItGPf5UY7BkAnK5G1hguZgaXX2LDcgxJjYFgaOWF3RgSoT+tYDDX8ykCR3iTpEsWue9IOjwdn5i0dcWGh58dCobZkQDkFCEM7LLSpotuAEDmzvmNkjI9QKYha3wYu0KeCkmrE8HLrCrR7RXnrBOTATiFKWuQ3oVUpToAt12Gzj47KRIhDICcX5AByxIIhupkf5N2AIC9N0ZNsrohZev96m1cXomkNYlxYCR7ujyhcNxAETjKjZJevMhnQ05asZ0dfjaEoTsSgJwihMGyBIIhv5idAgCcbDaA8Wb5fX2yNyxxy2oRUysGYMX5rqIIHOcvFzlOl2qNN5OJFeofPC2XyzUT3LVzmN0DIJcYvwNpSzQNX0lJAIBjzQYwuQotaiRN2nhT5ZK9LWxQGAhhnGeNpLdL+td5fudLzH5myJpVrURWSGxKcp/d83j10W932L5C/QOD8njcvewaALlGCIPlWKnMDewIAFie2TFgctlqxJDUIKmnQMrTSDwubEkckxSf8yeyxydpE8XgSH8k6UeSBuf53TotMK6T4TIz0lK/f/C0DBkhdguAXCOEQVoS48D4KAkAcKwGZb8L0ny8sroljTi8vFyJdfUkHu45D0PJDwQ8G8ZEZbUAiiT+nH3EqJq22iS+EHKqMkl/duCJfZ9/6Ff3fzgWjVbf9MoXfXjTlVvOKgcDa/f29cfD4fARdguAXCOEQcoSAyPWUhIA4Fg1clZQbne3JDt4dK4rRInsazFkJEIBU/OHYDOSphOPCVlhDdJHKxgHOzMw9Lv3/+zuWyIzkTpJuv/n935y05Vb/iQX63Kqrz8Si8e72SsAco2BeZGSxLSCjWJqUABwKp8yPw11qgzlPrw3EmVTL6lF0ipZA8uXK7tdtjyJ96yTtHrOepRSddOykSJwpqH+0/rJN35gzAYwkjQ9OfXSu37wi2tysT69/f0uScfZMwByjRAGqarhQhEAHMuU1Q3JiXyS/Dl43xJZwctqWV8ilMtZLYE9sqbsbUqsY52c0Y0sX2ygCJxneOisfvrNH2pqYvKi33UdPvEH2V6fwaEhTU+HTUmH2DsAco0QBkkLBENeMR01ADhZjcPP7bXKTktKl6xxaFbJGkS+PE+ueUxZgUxz4lEhWp4uZS1F4CwTYxP62bf/Z94ARpLCU9O37v7lb5ZswRSN2tdTryv07NjghDAAco4QBqlo4GIQAByrVFbY4GRuWeFIppiygp7ViT89ebw/Z7/4WC2pmmu2BTVTBM4Rng7rZ9/+sUbODC/2NOPgk/vfv9SyJienbFuvk909crlcM5KYHQlAznFCR1ICwVCZrFHuAQDOlC8Dpldn4PpjNnxpkRXyFNIXBq5EmRHGXKxSuenihnlEZiL62bf/R6f7Bpd87vTk1Et//l8/acvWup04GZK3tLTnutu/UsGeAuCEEzuwqMRgvA2UBAA4lk/5M46IIftawxiyBiEuxPBlvm2tnrOtsMbRgQNMjI3rp9/8gfpCvUm/pvvYyfaJsfGsTC9+rCsUjxquQ5KaAsEQxw+AnCKEQTKqxCCBAOBk1Xl4XlnuzZdf1pgvNSqurrIuWa1+msVA+Ss59HOv90S3ftDxHfV396X0umgkeskvvvPTV1304XDpVSN2r+P+Q4ejhrd0X+KfTYkW3gCQsxM5sKBEK5haSgIAHKsk8cgny2kNMzsD1Ao5a5ajbPPKaglSV8TXc9Uc/rkTj8f123se1k+/+UNNjE2ktYyh/tPvyvR6Do+M6vTQGbe3unbfnB+vTEw4AQBZRwiDZC5w3BQDADhWvo5xUJnGdUiZrNYvfIt9/v5fpeJsFcOMjTkyNjyqn3zjB3r03ocVj8fTXk40Et1837/8y2vn/V0sZsu6Hjxy1PrA2bR13wX3QCsDwRD3QgCyjg8eLCjRCqaGkgAAxzKUvwOTGkp+NieXpHpZLWC4drmYKatVTLF1zapm12ffsf1HdOdX/kununpsWd5wT/dn9/ztn3/32He/ds3cn09MTtqy/AOHj8rtdk80vfgVF65wiRjzEEAOcCGDxVSJVjAA4GSleX4uT6ZLkkfW2B/l7O6kzttNWv54O/miml2ePfF4XA/96n51fu9/FZ6atm25nqZNalq56uozTwa/t+f2D3/uzFO/rTJNc8au5R84dFimt2TfQsdMIBhihi0AWUUIg8XQCgYAnM2X5+vv1uItefyyBqD1sKuTVpIos5Ii2FZaMWRJZCaiX3znp3py92O2Lvd1z79CT/3zB3XnV77g+lT7X8hn6JXdP/zWL2KxmG0tun775NPRuLckuMhTViRafwNAVhDCYF6JUeO56AUAZyuEcUAqF/n5ChVX9xq7zHZPKvSxc1awqzMvPB3Wzv/4kboOHbfvBsQwdPvbXq4f/OXvq8Jn5YXbXnSzvv+1fzavueLSmng8bktL7N6+fp0eOmOWNjT9dpGnecW07wCyiBAGC6EVDAA4m5G4ech3pbq4+0y9mJnPjvrRUOA3l03s5syKx+Pq/P7/qi/Ua9sy6yvL1Pm3f6CPvOEWGcb5GWt1VaX+/lMfN2563g0aH59Y9ns9/vQeGYYRX/GCWx9f4qm1tIYBkC2M94GLJKbso38sADhbIU2vWi5peE5wwDnIPrWyQq4zBbZdpbLCOmTQk7sfU/fRk7Yt7/pNLfph+//VmobqBZ/jcbv1mY//pQ4cPrLs93vi6T3ylpYertx82dgST/XImmlshL0OINMIYTAfmmQCgPMV0uCr5YmbnxXK/3FunKhKVuvn0/m+Id/7p2/9wdTk1JYVqxp7b97+YpVVMl5zJh14fK9ty3rHtlb9y7tfqxLP0rcfHrdbV2zdsuz3fOjRxyMxT8mDKVz/EsIAyDhCmDyVaDLpTlyEm4mLqwubUcYSf0YTj0hHa0ssyZMQAIBzeLbMzoDkZbdmTEXiOmEwXzfgl9/73xvOnj7zF5LUdei4/vOLX9f6rRt17c2tqm9ijF67RWYiOnt6+Q2o3G5T//Ke1+kPfqc1q+t//GRIp/r63ZVbrrg3yZf4A8GQu6O1JcLeB8AFXBFLhC0lsprdliQuUL1K8xvQQDAUlzQjKSxpOvHnVEdry0zi937qBQDkhUIbPJ0AJvPKJcWVpy1ieo6H3jH33/F4XEf3HdbRfYe1futG3XBrm6rrnDuk3dTEpEr9+dPQa2x4dNnLaKqv1v/+1Vt13cZVWV//+x58RKZpTre84g2PpPCyChVe1z0ADsPNtgMFgqESWTMa+GU1y7ZzoLDZgRy9iYux2feMSJqkTgBA3mAQSaSjQlZL2by60Tyy52BVeGr6hQv9/tj+Izp+4Kguvf4KXf/CG+Qvd9bEUMcPHFU8Htf6rRvzpszD09PLev0Lr75EP/zw76m2IjdDPP3mwYdjZqnv/tIVTeEUXuYTIQyADOOG2yESwUulrGDEk6O6UMGeAIC8wQyHSFeVrG7KeTP+xdMPPXGTlmgFHI/Htfe3T+vgk/t1xQ1X6fIbrlJ5ZW4ubaLRqE519arr0HGdPHxcZwaG9Oq3vz6vKklkJr1eOYZh6KNveok+8Xu3ymXkJiseGR3VU3v2Gb7m1btSfCljUgHIyo03ciTR1ahCUrWs7kYAACR9r0MRYBlqZXVPnsyHlR0eGn5B8uHBjJ544FE9ufsxNa1p1ppL1mn1xjWqbay/aEpku0QiEQ109+nUyV6d6upRz/HQRSFGlYO7Stmlvqpc3/2Lt+glV2/K6Xp03n2fJMVX3PiSu1N8qcm4MAAyjRAmBwLBkEtW8FKjwprdAgCQPbSEwXKtkNQjK4xxtPB0+PpUXxOPx9V7olu9J7r18K4HVFJaoqY1zapralBD8wpV19eosqZKLpcrpWWOj4zpzMCQzgwMaaj/tIb6T+v0qQHFYgvPfeDxeuQvL+yZ13/n2kv0rT97sxqrcz9j1U9+8auYt6z8wdprn5tO1yK3JEIYABlDCJNFiZYv1bK+fSJ8AQAsR4wiwDIZsoKYXifXp4NP7a+JRaNrlruc6alpnTh4TCcOHjtXAIYhX5lfZZXlKvWVylPildvjViwafbYlSzQS1cTYuCbGJjQ1Mal4PJ7ye1fWVhdsJfJ63Lrj7S/Xn7zqxoy1NErFsRMntf/QYVfZmvU/4P4IgBPxIZMlgWCoXFKDCm82CwBAbsQpAtjAI6leUr9TV/DonkNbMnYQxeOJgGU8o9tQnYddkeKxpT9irl6/Ut/6szfrynVNjlnvnZ275Ha7R9e+/m2/SnMRfFEKIKMIYTIsEAy5ZX3LVE5pAADsvEeiCGATv6zJARw5UO/ImZGN+V7AVbVVebfOiwVTHrepj735Jfrw62+Rx+2czGJ6Oqwf/6wzapRVfD/FWZHmYrwtABlFCJNBgWCoUlYAQ799AIDd6I4EO9XIGqTXcePDzITDK/O9cL3Rqbxb5/GRsXl//pzNa/T1P3m9rljb5Lh1/vldd2tsfNxYeeurvr2MxRDCAMgoQpgMSAy82yimfAYAZA4DR8JOhqxu0z0OXLG8r+srNqzPu3WeGJ8479+lfp9+/3Uv0lffdLMjxn65UDQa1df/6/tRb3nFr5pe/IqeZR4LAJAxtNCwWSAY8kpaIwIYAEBmEcLAbl5Z3ZIc5YrnXfMdl2l253PB1rU05906G4kswjAMXXHD1Xrz+96qt7zoekcGMJL087vu0an+AbPqyud8aZmLoqsngIyiJYyNAsFQmaSVItwCAGTejKRpigE280k6LQeFfFc979rj3hLvy4K/uu8jU5NTt8Xy7DKrzOeRt8SbdxVh1YbVmgnP6MrnXaOahlqrcridWfbT02F95evfjnr8ZT9redUbn7bhsxUAMoYQxiaBYKhKVhckAACyISxramHAblMdrS1Oq1snW2/d/t6IYd52y2t/T/cf7lPwUCgvCrOxOT8vD9dcsk5rLll33s98pjNDmP/64Y81ODQUi8Vi7+tobTnJIQzAyWixYYNAMFQrAhgAAFAYKgLBUKkD16vMHY/qthsv1SN/9z6d+Pe/1Jf/6LV6fduVqq8sc2xhbrj2CmpUBoV6evW1b303FovFdgR37TxBiQBwOlrCLFMgGKqXVEtJAACAAtIgyWktCjyS5PdZ+dCahmq95xXP13te8XzF43HtC/UreDCkRw6e1KNHuvXUsV5NhnPbs8R0GVq9aV3BVIpY3FnDpcRiMX3y8/8Qk3RM0u0ctgDyASHMMhDAAACAAuULBEP+jtaWCaetmGmaF/3MMAxdtrpRl61u1Ntecv2zgcHxvjN66niv9nb16VDPaR3uHdShnkH1nR3LyrpeetXmvBwPZiHTUWeFMN/4zp166pm98Vg8/qbgrp2MkQUgLxDCpCnRBYkABgAAFKp6SV1OW6lwkq1bXIahDU212tBUq9c+7/Lzfjc2FVbXwBl19Z9V18BZnRwcVt/ZUfUOjarv7KhOnRnV0NikxqfCKa+fYRhqriqVMdwXff72W81CqhARB7WEeeDhoDq++Z/xeDz+weCunY9yuALIF4QwaUgMwltPSQAAgAJWGgiGSjtaW6Ycsj7jkjQdDi97QeWl3mdbziwmEo1paGxCY5NhjUxMaWJ6RuFIVLF4XCMTVrH4Szzyut2q9JdoRVW5mmoq9Kcf/Zv4obr6sMs0fYVUIcYjMUesx94Dh9T+qTuipml+58Ff/PiLHKoA8gkhTIoS01AzCC8AACgGNXLOLFwzkhSJRLN3oWy6tKKqXCuqUnvdk3v2xRt+5zW+QqsM49HchzAHjxzV+z7ysWg0Frs7Eom8i0MUQL5hdqQUBIIhr6SVlAQAACgSFYFgyClf2k1K0tTUlKML7FT/gKamply+lasKrjLkuiXMQ799TH/4gQ9Hp8Ph+8Lh8GuCu3aGOUQB5BtCmCQFgiGXpGbKDAAAFJlKJ6zE7MCrkWjU0YV17IQ1jE7pisL73q5vZDwn7xuNRvXVb/6n3t/+N/GZSOTb4XD4pcFdOyc4NAHkI7ojJW+FJC/FAAAAikyVpCFHXLi63ePDIyNlTi6sY10heX2+GXdZhafQKsLTR7v0iV/+t95525u0ujk7IdPjTz+jO/7xK9FjXSej8Xj8jx/8xY//jUMSQD4jhElCIBiqlEO+BQIAAMgyj1MG6HWb5pmzw84OYfr6B1RSVROWVHAhTOmKpuFfffU3kz/71a+bXnxTW/wNr36lcd1VV8gwDFvfZyYS0f0PPaLv/PAnsSee3uPyejz3xGKx/xfctfMohyOAfEcIs4REP+gVlAQAAChiFZJyHsIYhnF66Oxwi5MLqn9wUGZVTbwQK4HLW1JetvWqFWeefvSN9z34yIfv+s0DVzStaIi87CW3uG+58fnaunmTXGkGMrF4XHv2HdBdv7lfOzt/HR0ZHXV5PZ57JX3ygZ//6B4OQQCFghBmaSvEODAAAKC4lUsayPVKRCKR3uHh4audXFDdvX0RT32Lr0Drgbn+9/6wtrP1E9+W9O3WW7df3z8w+PZv3/mjN3/jO3fWl5eVRa658jLzsi2bjTWrmrWmpVlNK1aovMwvt/vcbcfk1JT6BgbV09unI8eOa+/BQwo+/lRkZHTU7fV4esMzM1+X9K8P/PxHxzn0ABQaQphFJKajLqckAABAkfMEgqGSjtaW6VyuxEwk0n1meCQmB39BNnh6KO7dcEUhX2M3SzolScFdOx+V9Gjrrdv/RNI1Y+Pjv/Ng8LGbHnnsyetnZmaa4vH4s81iTNOMm6YZC4fD5nkVy+0+YxjG4+GZmbsl/fyBn//oUQ43AIWMEGYBgWDIkNRASQAAAEiS/JKmc7wOp3pP9UXk4MkShkdHzZVlBf0dXtOFPwju2hmX9HjicYcktd663Stpo6RVksqj0WhVNBo1JE1IGpfUI6lr9y9+fJpDC0AxIYRZWLWYDQkAAGCWX9KZHK/Dib7B0469fp2eDmtmZsblKS/o+RySGpMnuGtnWNK+xAMAkMBYJ/NItIKpoSQAAACe5YRxTk6Ew2HX2eERRxbQ2RFrvdxF1hIGAJA8Qpj5VYtWQgAAAOddNwaCoVy3Ej4uSb19fY4soKEzVkMht7+skOtBM4cCACzjZEoRnI9WMAAAAAsqzfH7d0nSqf4BRxbO8MioJMldVlHIdaCFwwAA0kcIc7Fy0QoGAABgPiW5fPPgrp1THrf7dHevM1vCnB0ekeFyxU2fv5DrAN2RAGAZCGEuVkURAAAAzKsk1ytguFwHj3eddGThnD5zRiU+f7jA68BKDgMASB8hzByBYMgja+R/AAAAXCznM0eGw+GnT5wMxZxYOGfOjshTXhEp8DpAt30AWAZCmPNVUgQAAAALcifGz8ulA0dPnHRkCHP6zBmZZRXxAq8DvkAwVMKhAADpIYQ5XzlFAAAA4Ojrx4OjY2Pu0bExxxVM76m+mFlT7ymCOlDLYQAA+XkSdYxEVyRSfQAAgMWZOX7/vZJ0vCvkuILp7j0VLalrKIbrSbokAUCaCGHOKaMIAAAAHH/9eNzlcoUPHzvuqEKJRCIaOD3k9lYXRSMRZkgCgDw9iToJA/ICAAA4/PoxuGtnzOvxHDxy7ISjCuVkd69isZhR2lgUkwc1chgAQB6eRB3GRxEAAAA4//oxPDPz6KGjxx01AO7xk9a02aX1RZFPNHMYAECenkSdIBAMeZX7/s0AAAD5INezIykWiz1x6OgxR82QdPR4l3yVVVMub1EMMUhLGABIEyGMhQF5AQAA8sfTY+Pj5sDpIces0PGTIZXUN0aKpPxXUwUBID2EMBZCGAAAgOQYDliHpyXpiIMG5z1y7ETEu3J1sYwxuJbDAADSQwhj8VIEAAAAScl5CBPctbPf43afPeyQwXlj8bhOhLpdpY0ri+XamhAGANJECGPxUAQAAABJccSAuC7T9YxTpqnu6T2lmZkZl2/FymKpAysTYyoCAFI9f1EEkghhAAAAkuWIEGZ6OvzowcNHHTEGy+x02aVNq4qlDhhiXBgASAshDOUAAACQj546fjLkisVyP0nS4WPH5ausmjJLSoup/LdSBQEgdUUfPgSCIYNqAAAAkLS4Q9bj6Ugk4urq7sn5ihw5fkIljSujRVYPNnEoAEDqaAHijBH+AQAA8kXMIeuxT5KOnejK+YocOHx0pqR5rb/I6gEhDACkgRCGEAYAACAVjmgJE9y1c8zr9fbkeoakmUhEoZ5et69pVbFdU9IdCQDSQAgDAACAVDim2000Gn3iyLHjOQ2Fjp3oUjweN3zFMyjvrMs4FAAgdYQwtIQBAABIhVO6IykajT556MixmVyuw6Ejx2S4XPHShqZiqwfNgWComsMBAFJDCOOcweUAAADygZMGoN3T3XvKMxPJ3UzVh44dV1ldw6RhmsVYFy7ncACA1BDCAAAAIFmRjtYWJ32BtScWjxsnukI5W4GDh4/GvCtXF+s1NSEMAKSIEIaWMAAAAMkKO2x99hqGETtyPHeD8x44fDTma1lbWqT14RoOCQBIDSEMIQwAAECyHBXCBHftDHs8nq6jx3MzTfXg0JBGx8bc/pUtxVofruOQAIDUuIu9ABJNag9SFQAAAPJPNBp9/PCx42uVg8kWDh89LknyNRVtCHNlIBgyO1pbotREAEgOLWEAAACQt6LR6NOHjx3Pyci8B48cVUlZWdhdXlGsxe+XtJlaCADJI4QBAABAPjvY1z/gjuRghqRDR47J19g8U+Tl30oVBIDkEcIAAAAgn+2PxeNGqPdU1t/4wOGjkZJV63xFXv7PpwoCQPIIYQAAAJDPDknSiZPdWX3T8MyMToS6TV/z6mK/niaEAYAUEMIAAAAgbwV37RzxuN1DJ7t7svq+x06cVDweN3zFOzPSrCsDwVA5NREAkkMIAwAAgPy+oDVdB4+fPJnV9zx09JhcphkrbWjifkK6gVoIAMl/aAIAAAB5a3o6/HTXye5YNt/z4OGjKqtfMWW4uJwWXZIAIGmcNQAAAJDvDhzrOpnVEObQseMxz8rVXEtbbqQIACA5nDgAAACQ7w4Oj4y6x8bHs/aGh44ci/maV5dS9JKk5waCIYNiAIClEcIAAAAg3x2QpK5QdgbnPTM8rJHRUbevsZmSt9RK2kIxAMDSCGEAAACQ744ZhhE9fjKUlTc7cuyEJMnXtIqSP+clFAEALI0QBgAAAHktuGvnjNfr6cnWNNWHjx2Xp6Q04qmspvDPeRFFAABLI4QBAABA3otFY3tOZLEljG9F4xSlfp4XB4Ih7i0AYAl8UAIAACDvzUQie493hSLZeK9DR49Fvc1rSij189RIuoZiAIDFEcIAAACgEOzv6u7J+LVtPB7X0eNdhq+pxUORX+TFFAEALI4QBgAAAIXgYDgcdvUNDGb0TU71D2hqetrFoLzzupUiAIDFEcIAAACgEByUpK5Qd0bf5NDRY5IkXxPTU8/jpkAw5KUYAGBhhDAAAADIe8FdO3tN05zMdAhz5PgJ+Soqp81SP4V+Mb+k51IMALAwQhgAAAAUBI/bfawrlNlpqo8eO6GShqYZSntBL6MIAGBhhDAAAAAoCOGZmT1d3T3xTL7HwaPHIiWr1tIMZmGvpAgAYGGEMAAAACgIsVhs37ETXZEMLl9doR6ztKmZa+iFXR0IhlooBgCYn5siAAAAQIE4fKp/wB2NRmWapu0L7znVp2g0apTWN1HSi3ulpI5C38htO3aXSlohqUxSiSSvpLCkSUnDkvo629viVAcAcxHCAAAAoFAcjMViRm9fv1qaV9q+8ONdIUlSaUMjJb24V6hAQphtO3Y3SLpU0lZJWyRtlrRRUrOkqiVePrNtx+6QpCckPSrpXkkPdra3RakiQPEihAEAAEChOChJJ06GMhLCdHX3yOvzh02fn2mYF3drIBgq7WhtmcqXFd62Y3eTpMskXSErdLlU0uWS6pexWI+k9YnH6xI/G9y2Y/edkr7U2d62j6oCFB9CGAAAABSE4K6dZ57/steOnuzprcjE8k+cDMlX3xCW1e0EC/NLeqGkXzptxbbt2L1S0pWyApfL5/xZlaVVqJf0R5L+aNuO3T+W9MHO9rYjVBmgeBDCAAAAoGCYputQV6j7ukws+1jXyZi7YaWHUk7KK5XDEGbbjt2Vslq1XCErdJl91DqojF4r6RXbduxul/R3jB8DFAdCGAAAABSMmfDMnhMnu6+VZNi97ONdoVjZjbeWUMpJeY2kP8n0m2zbsdsta7yWq3V+6LI2T8rJK+nzkp63bcfu2zrb28JUHaCwEcIAAACgYMTi8YPHT4YissbjsM3U9LTODg+7a2sbKOTkrAkEQ9d3tLY8atcCt+3YXSXpGlmBy9WJv18ua2aifPcGSSXbdux+A0EMUNgIYQAAAFBIDgyeHvKEZ2bk9diXw/T09kmSSmrrKOHkvU7WrEAp27Zj93qdC1xm/1xX4OX1KlmzSr2DqgMULkIYAAAAFJLD8Xhcoe5ebVi3xraF9pyyQhgvLWFS8QZJf7XYE7bt2G1I2iTp+sTjOknXSqop0jJ7+7Ydu3/T2d72daoPUJgIYQAAAFBIDkpSV3e3rSFMd+8peUtLZ8ySUgbmTd6WQDC0taO1Zb8kbdux25S0WVbQcr2k58hq5VJBUZ3nC9t27P5pZ3vbIEUBFB5CGAAAABSM4K6d4ze+4ndPn+zutbXfUM+pPpVU14Zl81gzhW7y9NQntu3Y3S3pubICFz+lsqQaSR+X9D6KAig8LooAAAAAhcQwdOhEKGTrMntOnZK7tsGgdFNjelxvlPSnktpEAJOKd23bsZsBiIACRAgDAACAgjI9HX6m62R3zM5ldnX3zHjrG32Ubmq8lV65S2l8nwafpHdRDEDhIYQBAABAoTlw/GQoaucCB0+fMTxV1bSESUNZIw1g0vQmigAoPIQwAAAAKDSHzg6PeCYmJm1Z2EwkotGxMbenvIqSTQMhTNquS0zVDaCAEMIAAACg0BySpK7uHlsWdnrojCTJW11DyaahpMorj48uSWm6iSIACgshDAAAAArNYcMw4l2hblsWNnh6SJLkqaAlTLpoDZO2GykCoLAQwgAAAKCgBHftDHs8nl67W8IQwqSvbGUZhZCezRQBUFgIYQAAAFB44vH9J0P2hDBnR0bk9niihpsuNenylnvkKfNQEKljMGigwBDCAAAAoOCEZ2b2HOvqitixrOGREXn8FSalujzlTXRJAgBCGAAAABSiQ13dPba0IhgeGZXbT3ea5WJcGAAghAEAAEBhOjAxMWmeHR5Z9oKGR0fl8hHCLJenzCNvhZeCAFDUCGEAAABQiA5J0gkbZkgaHiGEsUtFSzmFAKCoEcIAAACgEHW5DCNixzTVI6Njcvl8lKgNypv8MkzGmgVQvAhhAAAAUHCCu3ZGPV5PV6i7d9nLGh2fkNvHeCa23Hy4XYwNA6C4PwcpAgAAABSiSCS65/jJ0LKXMzY2LpOWMLappEsSgCJGCAMAAICCFI1GDxw/eXJmucsZn5iQWUoIY5eSqhJ5yz0UBICiRAgDAACAQrU/1N1rxuPxZS1kYmJCZkkppWkjBugFUKwIYQAAAFCoDs9EIq7+wdNpL2B6OqxoNEpLGJuVryxjgN4kqyBFABQWQhgAAAAUqgOStJwZksbGx62LZkIYe29CGKA3WZMUAVBgn38UAQAAAApRcNfOU6ZpTp44uZwQZkKS5GZgXtsxQC+AYkQIAwAAgILlcbuPngilP0PSbEsYuiPZr6SqRJ4yBugFUFwIYQAAAFCwwuHwE8e7lh/CuEoIYTKhYlUZhQCgqBDCAAAAoGDFpINHT6QfwoyOWSGM28f4JZlQvrJMhsEAvQCKByEMAAAACvdit6TixODpQU1Ph9N6/cjomDwlpRJBQUaYXlO+eqb/BlBE5yWKAAAAAAV7seurPRaPx9XVnd7gvKNjY/L46DKTSeUrKd9FnKUIgAI7L1EEAAAAKFT+TS/qkwx1hXrSev3o2DiD8mZ6HzX45HJzWwKgOPBpBwAAgIJlVqyMlZRX63jXybRePzwyItPPVMqZZLgM+RsIugAUB0IYAAAAFLISw1eXdkuYoTNnZfjpLpNpdEkCUCwIYQAAAFDIxuKlNTpyoiutFw8OnZW7opJSzLDS2hK6JAEoCnzSAQAAoJCdNf116gqlNzDvmeFheQhhMs4wDJXWllAQAAoeIQwAAAXuqe6z5p6+UZOSQJEaM/11mpqa0sDpoZRfPHTmrNxljAmTDf56xoWZxxRFABQWQhgAAApcJBL5I0l/Q0mgGHW2t0Vc/tppSeo6GUrptWPj4wqHp+WprKYgs4AQZl6EMECBIYQBAKCABY/0lcfj8d+V9NE9faPbKBEU5QVvScWI6SnR8RRDmL6BQUmSt7qWQswCs8SUu9TthFXpZW8AyNg5iSIAAKBwxaUPukyzSpIh6dt7+kabKRUUoX5veZ1OnExtXJhT/QOSCGGyqaTSm8u3H5L0QUmXSIqyNwBkAiEMAAAF6pEjfSslfdBtmqsSP2qQ9B3Gh0ER6omV1KbeEqZ/QJ6SUpmldJPJFrcvJy1hpiTdIWljZ3vbFzrb28YlhdgbADLyOUcRAABQsD4hyXCZrsY5P7tZ0qclfYTiQRHpc/lqdfTEvpRe1NvXr5IqWsFkk8ttZPst75T0F53tbScu+HmXpLXsEQC2f85RBAAAFJ5HjvRdJumdhmEcm+fXH97TN/pySglFpMflr9XA4KCi0eR7mZw42S13bQOll0WRqaz1AnpK0os629veOE8AI0mHHVIkcWoFUFgIYQAAKEyflWSapjmxwO+/tadvtIViQpHoM/21isfjGhw6k/SLjpw4qdImhlHKluhMTON9E5l+myFJ75F0XWd72z2LPO8ZhxTLMDUDKCyEMAAAFJhHjvTdImm7JJlus3qBp9VJ+u6evlEPJYYicNJVWiVJ6k/MeLSUSCSi7p5elTY0UnpZcnr/kGKRWKYWH5X0T5Iu6Wxv+5fO9ralmtzsY48AyATGhAEAoIA8cqTPkPT5xD/jpunasMjTb5R0u6zZQIBCdtTw+OQyTZ3qH9CVl21d8gWh3lOKxaIqbaQlTDacPTai8VMZawWzW9J7OtvbnkzhNYQwADKCljAAABSWt0i6XpIMwzhuGMZSMyH9+Z6+0VdRbChwRyXJU1KuoTNnk3rBiS5rchxawmTe2aPDOnP4bCYWPSDpXZJekGIAo872tuOSzrB3ANiNEAYAgALxyJE+r6yZj6yTvMs1mORLv7mnb3QNJYhC1dnedkbSGZenRCNjY0m9ZnxiQqbbI5e3hALMkHg0roFnTuvMEduHPYlJ+mdJWzrb2/69s70t3cFtH2UvAbAb3ZEAACgc75O0bvYfpttM9u6xRtL39/SN3nx5Y0WYYkSBOmqY3uvHJ5Lr8tLc1KhoZEbTg30qqac1jN2mh6c18MxpzUxE7F70Q7K6Hj1uw7IekXQrewuAnWgJAwBAAXjkSF+NpI/O/ZlpmutTWMRzJd1BSaKAHYmbXo2Njyf15Csu3aKa6moN7L6HkrNRNBzV4N4h9QT77A5gTsvqetRmUwAjOaMlzCS1BigshDAAABSAuPTRuNWiZdagy2VUpLiY9+/pG30dpYkCdSBuuDU+ntw9rdvt1tve/AYNPnyvJntPUnrLFJuJ6ezRYYUe6NVo95gUt3Xx/yZp8zK7Hs1ntwOKbpraAxQWQhgAAPLcw0f61snqiqR44mG4XOneNf77nr7R9ZQqCtCemFmiqenk72nf9Nrt2rxpo45/+6uKTtEgIR2RqYiGDp3Vyfu6debIsN1TUD8l6cbO9rY/7GxvG7J73Tvb205JOsJeBGAnQhgAAPLfpyV55/7ANF3p3ulUyxofhtFIUWieMVxuJTsmjHUcmfrMX39YZnhSJ77zb4pHI5RikiZPT6n/yUGF7u/R8PERxaK2Nn0Zk/RBSdd3trdlurXKfexNAHYihAEAII89fKTvOZJ+78Kfu93upmUs9jmSvkDposAclOGOjU+k1qKlualRf/+pj2ni+CF13flNKR6nJBcQHpvRmcNWq5dTj/VrvH8iE8X1A0mXdba3faGzvS0bqdj97FkAdiKEAQAgn8X1uXl+Om2arlXLXPIf7+kbfQMFjELR2d42Y7jMgbHxiZRfe/Xll+qzH/uIzj7zmLru/KbisRgFmhAem9HZo8PqfrBX3Q/26uyxEUWmopl4q2OSXtnZ3vaGzva2bA7Scy97GYCdCGEAAMhTDx/u2y7plmcHgkl842wYxlGb3uJre/pGN1LSKJwrXzM0dOZMWi+98bmt+uzH/1JnngrqxPe/XrRBTCwS08TApE7vP6OT9/eo+8FenTkyrPDYTKbeMixph6TLO9vbfpbt7e1sbzssKZTLIufABQqLmyIAACD/PHy4zy3psxf9Ii6ZpmvUpreplPTfe/pGn395Y8UUpY68Z7gOTE9PXz89HVZJiTfll9/8/Ofqsx//S334E7erS9KaN75Dhquwv9OMx6Xp4WlNnp7S1NCUpoens9kj69eS/rizvW1/jovhLklvy9F7j3DgAoWFEAYAgPz0DkmXzXtyd7urbHyfayR9UdK7KXLkvVg0KOn3BoeGtGplesMmzQ1iYtG41vyft8v0Fs4ldWwmpqnhaU2fndbU2WlNj4QVj2Z9HJxTkv60s73tuw4plnuUuxAGQIEhhAEAIM88fLivXNInF/q96XZtsPktA3v6Ru+5vLHiu5Q+8lo89r+S/v5418m0Qxjp/CDmwFemVX7Va+T2e+Txu+X2ueUuNRN/Wn83XIYjiyMWiSk8OqPpkbDCo2FNj4Q1Mz6Ty1WKSvonSR/rbG9zUguQuzh4ANjFoAgAAMgvDx/u+5ikT8x7YjfUVVbuX5OBtx2TdP3ljRUH2QPIZze++i2Rt71+u/mHb/29ZS/r3t0P60N/82mVrrtRpetvXvB5pteUWWrKnfjT9JpylyT+7jFlel0yvaYMMzOX5vG4FJmYUXhsRjPjMwqPzig8FtbMhKOm3H5I0rs729uedGK92bZj92FJuRgj6x2d7W3f4MgFCgctYQAAyCMPH+5rkvShhX7vcrn6JGUihCmX9IM9faM3XN5YMcmeQL4y/CtCDwQfW2tHCPPCtufq/YF36Ytf+TeZVavlqV0/7/Oi4aii4ajCS62by7ACG69LLrdLLk/i4U48TEOG2yXDZVh/Nw0ZxrngJhaNKTYTUywSU2QyopmJiGbGZxSZjCru3Km1T0v6iKSvdba3OXn+77uVmxAGQIEhhAEAIL/8jaSyhX5puk1vBt/7CklfkvQH7AbkK1fV6l/v3X/PO06c7Nba1auWvby3/O6rdd9Dj2hv1wMLhjDJisfiikxFFCmOYbDjkr4m6SOd7W2n82B97+KzD4At5yGKAACA/PDQ4VNb44r/QVwLf1nsdptrM7wa79rTN/r77A3kq5KW1v8sqajTv37rv2xZnmEYeslNNyo80kvhpvBxJumGzva2P8yTAEayBufNhQmqC1BYCGEAAMgfd0gyJSk+5785zrhcruosrMdX9vSNXsbuQD4yTM/DnvUvinXe/Rvd9Zv7l728sfFx/cf3fyhv7ToKd2l9kt4uqa2zve23+bTine1tpyTtycFbh6k2QGEhhAEAIA88dPjUzZJeNd/vZsMYw2WcyNLqlEm6c0/faBl7Bvmms71tzFO/+THf2ufqr3Z8Xp13/ybtZY2Nj+sDH/2kTg+Py3vJyyjchUUkfUHS5s72tm86fOyXxdzDrgSwXIwJAwCAwz10+JSRuIFZlGma2Zzq5DJJX5b1rTaQbx4o3fiS50gu/dWOz+nX9+3WO297ozZvTH5298eeekaf/Pw/amBoRL6r3yJXSQWlOr9OSe/vbG/bXwDbcpekP2aXAlgOQhgAAJzvTZKes9STPB5zRZbX6217+kbvubyx4hvsIuSZByS9v3Tji+SuXa/dT92lX9/3fl2ycYNecMNzdMVlW7RudYsaG+rl9VpjXcdiMYV6evXQo4/rV/fcpyef2avSuvXyX/96uUorKdGL7ZP0oc72tp0FtE33yhpQ2GD3AkgXHyAAADjYQ4dPeSXtl7TUtCvhiooybw5WcULS8y5vrHiavYV8sW3H7pWSeub+LHLmuMJ9e6WRE5oeO/Pszz1er9ymW1NTk4rH43K5THnrNsjdfL08dRsozIv1S/q4pH/rbG+LFGDdeVzSNVl8y9d1trf9mGoFFA5awgAA4Gzv1dIBjAzDOCZpSw7Wzy9rfJjnXN5YMcbuQj7obG/r3bZj91FJz6Yo7pp1cteskyT5IlOKTpxRfHpU8ciU4rGo/KZHLn+tzLIGGaaHQrzYpKxuk5/tbG8r5M+C+5TdECZK1QIKCyEMAAAO9dDhU9WS/iqZ55qmaziHq7pF0lckMXU18u1met6mLIa7VO7KlZJWUkpLm5H075L+trO9rbsYPpolvS+L7zdKFQMKCyEMAADO9VeSapI6obvduR4V9LbE+DD/xm5DnrhH0tsohrRNSPq6pDs629u6imi7H2LXA1gOpqgGAMCJV/mHT62V1RUpKW636YTBKb60p2/0GvYe8sQuiiAtByX9uaTVne1t7y2yAEad7W1HZY17AwBpIYQBAMCZPi2pJMnnhgzDKHHAOpfKGh+GuXqRDzfTIUmHKImkRCTdKelWSVs729v+rrO9baiIy4PWMADSRnckAACcdnV/+NT1kn4v2eebpuuUpBaHrP4mSf8q6c3sSeSBX0u6hGJYUJekr0r6Wmd72ymK49zHtKRXUwwA0kEIAwCAw8SlOyQZmv3fUidzt9t02Ca8KTE+zFfYm3C4XZICFMN5piT9SNJ/SOrsbG+LUSQXeZAiAJAuQhgAAJx0ZX/41CslvXj23/E5v1sokHG7zTUO3JR/2NM3Gry8seJR9ioc7J7EYWZQFBqQ1C7pzs72tmGKY1G/lRRTdoZ2GKe4gcLCmDAAADjEg4dPmZI+u9Dv43Mec4y4XK46B26OV9L39/SNVrFn4VSd7W2Dkp6kJCRJ7+xsb/s3Apik6s2YpKez9HYzlDhQWAhhAABwjndIujyZJ86GMYbLOO7g7dkg6WvsVjjcLygCDUv6JcWQErokAUgLIQwAAE64mj98qkzSJ1N9nWma0w7ftNfv6Rt9H3sYDvZzikA/7Wxvo8VFah6mCACkgxAGAAAniOvPJK1M9WUet7s+D7buC3v6Rm9gJ8OhdstqCVLMvk81SBktYQCkhRAGAIBcX8kfOtUo6cMLDfqyiKhpmuvyYBM9kr63p2+0hr0Np+lsb4vImiWpWI1I6qQmpOygpKEsvA9j9AAFhhAGAIDc+xtJZef9JIlAxjCMI4aRN7O6rJP073v6RpmFBk5UzOPC/LyzvW2aKpCazva2uKRHsvBWcUobKCyEMAAA5NCDh05tlfSHS16CzxPImKYr374hfa2kP2Wvw4GKOYS5k92f/kc4RQAgVYQwAADk1mckmUk/e04g4zbd/jzc3s/u7Rt9PrsdTtLZ3hZS9qYcdpIJST+jBqTtIYoAQKoIYQAAyJEHD526SdJr0n29x2NuyKftNayHW9L39vaN1lID4DDPFOE27+psb5tk16ftYWW+u9A4xQwUFkIYAAByYPehU0Zc+nxq4/Ce55RhGL582NZE+DLXaknf3Mv4MHCW7iLc5p3s9vR1trcNS9qf4bdh6nCgwBDCAACQG/9H0rPTNqc6MZJpuhx/wzhP+DLXdkkfohrAQQaKcJvpirR8uykCAKkghAEAINtX7IdOeSXdvtDvkwlk3G7Tka1IDC0Zvsz16b19oy+gRsAheotse5/obG/rZrcv2yMUAYBUEMIAAJB975GU1HguCwUybre7xUkblELwMvdFpgx9d2//aD1VAg7QX2Tbu4tdbotMhzBTFDFQWAhhAADIot2HTlVL+ut0XjsnkBk3TdcKJ2xPmuHL3BetkvStvf2MD4Oc6ymy7e1kl9viGWUwKOlsbyOEAQoMIQwAANnVLmlZMwO5XMbRXG+EDeHLXC+T9FGqBnKsmFrCTEu6n12+fJ3tbRFJj1MSAJK+jqMIAADIjt2HTq2V9L7lLsc0zZx8M5rieC8pvsj4xL7+sRdSS5BDA5JiRbKtDzM1ta1+SxEASBYhDAAA2fMpSaXLXYjHbdZkc6VtbvVy0ZOs/+SS9J19/WMrqCbIhc72tpiKZ4YkWsHY6+EMLTdK0QKFhxAGAIAs2H3o1HWSbrNhUTG329yQjXXOfPhy0VNXSvr2vv4xkxqDHDlVJNt5H7vaVo9maLljFC1QeAhhAADIjs8pjUzjQoZhHDcMI2Pn77S6HElJhy/G/OHLXL+jNAcuBmxQDCFMTNJudrWtDkgaoRgAJIMQBgCADNt96NTLJb3YjmWZput0JtZxWcFLCuFLkv56X//YS6g5yIG+ItjG/Z3tbQQGNupsb4uLcWEAJIkQBgCADHrgUK9L0h12Lc/jNkvtXL8sjfeSzvXJf+7rH2uiBiHLiqElzKPs5owIZmCZ4xQrUHgIYQAAyKx3xBW/Ii7rv+Vyu922jAeTg/FeUtUo6b8YHwZZVgwtYWixkT/lOkOxAoWHEAYAgAx54FCvX9In5/4sPue/NAy6XEZZuuuT4SmmkxnvJVUvkvQJahKyqLcItvExdnNGPEIRAEgGIQwAAJnzZ5KaF/plqoGM6XJ1pbMSmWv1Yj0xzS5HyWrf3z+2jaqELOkvgm18ht1sv872tq4M1B/G7gEKECEMAAAZ8MCh3hWSPpzs85MJZNxuM6XmMw4d7yXVVTEkfXt//1gztQpZUOgtYfo629vOspszxu4uSTGKFCg8hDAAAGTGxyWVp/PChQIZt8dcmczrczzF9LIs0PupQdJ39/ePualWyLBCbwmzl12cUXZ3SYpTpEDhIYQBAMBmDxzq3SIpYM8V+LP/TblNc8HWINka7yVTkliNmyR9itqFTOpsbxtUYQ+Guo+9nFF2t4QZpkiBwkMIAwCA/T4jydZZfVyGcWS+nxdIl6NkfXh//9jLqV7IsIEC3raj7N6MYnBeAEtf01EEAADY54GDvS9QXK+1e7mm2xyf++88mGJ6ydVIc/nf2j8w1kJNQwb1FPC2dbF7M6ezvW3A5jKOZHylt3/I1PYPXa7tH7pF2z/UyF4EMo++1QAA2OSBg72GpM9LOr8nvw1phtftrk57UUnPcpRZhj0vrpP0/f0DYy/c2lA+Q61DBhRySxhCmMx7QtIam5Y1lpE13P4hQ9Ktkm6T9DpJlc++3/YPNWnnHePsRiBzCGEAALDPGyQ996KfLj+QiXvc5oaUx3tJ8ol5Er7M9XxJt0v6IFUOGXCygLftBLs34w47ds22f6hc0lslvU/S1nmeUS6pXhIhDJBBhDAAANjggYO93kQwsLg0AhnDME4YhrEuuScn/6Q8DF/m+vMDA2P3bmko/ym1DzbrLtDtCkvqY/dm3EEblzVhy1K2f6hO0ntlhS91izxzRoXdHQ9wBEIYAADs8W5JG1N6RZKBjOlyDUhat+iyHBK+GBlewAW//uaBgbFrtzSU8+0+7FSoIUxPZ3sbUx5nnp0hzPJapGz/UL2sFoPvlVSWxCt2aecddPMEMowQBgCAZbr/YG91XPrYAkFBchYJZDwed8mCryus8V5SfUqNpDsPDIy9YEtDeZiaCJuE2C4sg53dkdILYbZ/qFrSR5R8+DLr6+w+IPMIYQAAWL6PaE4T7wu/ak45oLggkPG4zbXpLbBgw5e5WiXdIekDVEPYpFAHryWEyV45T0kqtWFZZ1N6thW+fCDxqErxvfZJ+gG7D8g8pqgGAGAZ7j/Yu1rS+xd7TnzOI2VxDZkul3UxndIU00bGux0ZGXpxGlNYv//AwNjrqI2w8Sa6EDEzUhYkunzZ1RomuTFhtn+oXNs/9DFJxyV9XKkHMJL0Z9p5R4w9CGQeIQwAAMvzaaXwjWeqgYzpcnWlFr5kbsyXNMKR+ReQ3q+X8u8HBsY2UB1hw030qKSRAtw0WsJkj10hzOJTVG//kE/bP/QRWeHLJ5Re+CJJX9fOO36x6AadnvQcPj1psGuB5aM7EgAAabr/YO81kn4/3dcnMy6v22NGFl9KUXQ5Ska1pDsPDIy3bWkom6Z2Ypl6JFUW2DYRwmSPXSHM6Xl/uv1DPkkBSR+W1LTM99gv6U/m3YjTkxslvVzSNkkrJd0oa5YtAMtACAMAQPo+b1eGsFAg4/W4G+d/BeHLPEu7TtIXZA1GCSxHl6StBbZNhDDZc8ym5ZwfwtgbvkhWS5vXa+cdY5J0eHCyTNKLJL1M0ssU18Y5H9Q3b6rzEcAANiCEAQAgDfcf7H2ZpJdkYtlzApmw222uPvfPzE8xvezlGxlcdhJLNKQ/Pjgwfs/mhrL/ppZiGQoxsDjObs0au8bfGZAkbf9QjaR3yxpwd4VNy45Jesvhb3zCLX3ig7JavLxAkveiE5Khf91U57uP3QrYgxAGAIAU3X+w1yVrRp6MMgzjqKSttHpZeokXLP9rBwfGn9zcUHaI2oo0HS+w7RnpbG8bYLfmV/3Zd/TJOm3/0D9JertSm2p6QVVlPt14+Ua96+Vtj1y1flVHXGpe4vO5T3F9mF0K2IcQBgCA1L1d0pWZfhOP2xzJdPySh12Okll+paQ7Dw6MP29zQ9kU1RVpOFZg23OUXZpVJ+xYSKjvxF3LXYbpcumK9c26+cpNuvnKS3TVhlVyGYYkPW/2OfHFP6s/sKned4ZdCtiHEAYAgBTcf7DXJ+lvs/FeXo87YwOD5nP4kuSyr5b0RVlN+IFUHS+w7TnMLs2ezva20W07dp+RVJPuMqbDU4rH05sxekV1hV5wxSbdfOUmveCKjaoq8y35mgWCmF9sqvd9lz0K2IsQBgCAFMSlPzOk5my8l8fjtnXKZSPDC8hyl6NkBBLjw3ATgVQdL7DtIYTJTR1KO4SZnB5P/lzhNvWcS9bopis36aYrL9HW1Y3pnt/mfs5OSvojdiNgP0IYAACSdN/B3gZJH05maunlMgzjpMswVtuyrAy/2IHhy1z/enBg/InNDWX7qcFIQY+kGUmeAtkeQpjs65J0bbovnpyaWPT3qxtqdPNVl+jmKzfq+ZdukK/Ea8tKzwliPrap3nec3QjYjxAGAIDkfVxSxYUXrDaFBecxTVefpGWFMAU63kuqiy2XdOfBwfEbNteXTVKFkYzO9rbYth27uyRtLJBNIoTJvuPLefHoxMh5//aVePW8S9fppis26earNmnNitoMfRZLcelxw+rOCSADCGEAAEjCfQd7N0sKLHHhattFsdftTvscXQTjvaS62CskfUnSH1CTkeJNNCEM0rWsaapHxs5qy+pGveCKjXrhVZfo+kvWyOM2Fzz3GEsNr5u8mKTApnpfhF0IZAYhDAAAybk9lfPmcgMZr8e9JpXnF+F4LymtqCG969Dg+D2X1Jd9m6qMJB0vkO0Y7mxv62Z3Or/++EtMbV1Voa0t5frYG9+qFdUVSb/WxiDmS5fU+4LsPiBzCGEAAFjCfQd7b5T0u+m+Po1AZtg0XbXJPJEuR4sv5IJfdRwaHH/8kvqyPdRqJOFIgWzHU+zKnFhymmqXYWhNg0+Xra7UpasrtK6hTMYyPhRtCGJOSvprdh2QWYQwAAAs4r6DvYakz9m1vGQCGdPlOiHpqsWWQ/iixVq9LMQv6fuHBsdvuKS+bJzajSUcLJDt2MuuzIl5Q5gqv0dbWyp02epKbW2pUFmJaeubLjOIee8l9b5Rdh2QWYQwAAAs7vWSnp+JBS8UyHjc5vRCr8lk+FIAXY6ScZmkL0t6O1UbSyiUcVQIYXKgs71tcNuO3eOmyyjb2FSmS1us1i6ran0XnQcyMLBuOkHMDy+p9/2EPQdkHiEMAAALuO9gr1fWWDAZNzeQ8XjdK+b+jvFeFl9QGst/W2J8mG9Qy7GIQglhnmFXZteBgYkNkl5+oHs0ur6xTF63a9EP/7iR8yBmVNL72HNAdrgoAgAAFhSQtCnL7xnxmO61Slw6p31hbiy9gGUtP4k3tGX5i2zHMpf/L4cGx6+kimMhne1t45JCBbApjIGUYQcGJsoODExsPzAw8aUDAxOHZY0n9E9bVlVULhrAzIqfH8TbJT7n/0v4yCX1vh72JJAdtIQBAGAe9x3orVJcH89AM5FFGYZx1GVoc/oLsOUpy3rDHI33kqpSSXceGhx/ziX1ZWPUeCzgsKSWPF7/ns72tj52o/32D0xcZUjbJL1c0gskeZe1wNy1iHlI0lfYo0D2EMIAADC/j0iqW/Zc0ynyuM2zab2QLkfp2JK4+fh9qjsWcEjSLXm8/o+yC+2xf2CiRtLvSHqZpJdKarZ9PJfsBzERSf/vknpfjD0MZA8hDAAAF/jNgZ6WuOIfMC68YM1CIFPicZcn/eSst3q5eIlZnmI6E1tz2+HB8d9sqi/7KjUf89175/n6/5ZdmOaOH5gwJT1HVujyMkk3aJ6hHPI8iPn8JfW+p9nbQHYRwgAAcLFPSSqNz0ldFg1kbEwLvG73hmSSAxuekoLsdjmyf/2XXP4/Hh4cf2RTfdkTVH1cIN9nFqIlTAr2D0w0y+pi9DJZrV5qk3ldngYxRyV9kr0OZB8hDAAAc/zmQM/Vkt568cXrIoHM7NXtMhMEw1CPy2U0J5scpPmUVNYoM8vObpejZJZfIunOw4Pj122qLxvlKMAc+T6z0OPswoXtH5jwyhrP5aWygper0l1WHgYxgUvqfZPUAiD7mB0JAIDzfW6pa+n4nP8WvMqdfaTAdJm9C6YHScxyZP9MR0m9fbqLtX/5qb3thTZJ+leqP+bqbG8LSRrO09U/2dnexow3F9g3MLFh38DEH+8bmPiJpCFJd0n6kJYRwMz96LdV5mZN+vYl9b5d1AYgN2gJAwBAwm8O9GyT1QQ9hYtZ+1rIeD2mkexzk3xKigpuvJdUvenw4Ph9m+rLvszRgDmeltVaIt88yK6T9g1MlEl6kazWLi+XtHHux3NmWprYu0CbW8QMSfozagaQO4QwAABI+s2BHpesVjDLuFZeXiBT4nGvYbyXjL1tsv7u8ODEQ5vq/YylgVl7lJ8hzAPFusP29Y9fJcNIavroIgxiPri53j/AYQ3kDiEMAACWt8qG5ujnrplTDmTG3G6zPsMBw4JLK+DxXlJdilfS9w+fnrhuU51/mMMCyt9xYR4qlh20r3/8oumjFY9LRnKfDEUUxNwj6Rsc0kBuEcIAAIrebw70+GTNiJQRyQQyLpfrmKQrMxMuLLxEwhdjvr9ukPQ1SW/g6ICkM3m4zuOSHivUHbK3f9xlSK1aYvpogpjzTEsKbK73xzmkgdwihAEAQPpTSauy8UYLBTJejzllb7iw+NKKcLyXhZcw/2DBrz9yeuIDG+v8X+TwKHqePFzn+zvb2yKFtBP29o+vlNXK5aWStsWl2qQ+BwhiZu3YXO8/yOEM5B4hDACgqP3mQE+DpA/n4r3nBjIlXnedPeHCAkHDwnmDHYu1d/kZXfbC4cs8y7/jyOmJ3Rvr/I9wpCDP3JPvG7C3f9wr6Uad62J09cWfoUl+LhDE7JP0GQ4LwBkIYQAAxe5jkipzvA4xr9tcZ+8U04uGC3Ys1v7lK1PLN1L551weSd87cnriuo11/jMcKkXLzMN1vicfC3pv//gGneti9CJJ5Uu9hiAmKf9vc70/zKEMOAMhDNL2nq/86ooDJ/oP3nX7bXyoA8hL9x7ouSQuvdvI8XoYhnHUMIxNNiwp2XBhOYu1f/nK1PKX7HKUjHWS/v3I6Ynf3VjHWApF6vo8W99RSb/NhxXd2z/ul/RiSbMzGaX1OUgQs6h/3Vzvv5/DGHAOQhik7ZK1K7bfdN2mTz//6t2nnjrYvXt8MvyopKckPXXX7beFKCEAeeB2Se54FoOF+Xjc5jJaWTDey6JLMGxZ9msl/bmkz3PIFKWX5dn63uXk8WD29I9fKemlhlWuN2mR6aNTQRAzrz5JH+IQBpzFoAiwHP+8a89/Xbu15S0zkaj2Hj2lx/af1NHQacXj8bOSnkw8npYVzjxz1+23TVBqAJzg3gM9bZIecMJJssJf+rS/1Hvlck/hmQxf8miK6XkXaMPyI5Ju3ljnf5Cjp3hs27H7Rkn51orgPZ3tbf/ilJXZY00ffausli7bNGcQ9Ex8riS9TMOwf5m5vAmbP4h5y+Z6/3c5kgFnIYTBsn39voOPbV3feO3sv4fHJvX4/pAePxDS6bPjc58al3RYidYyiceTko7fdfttNPEGkFX3Huh5QFKbE06Y9dXl46bLVZbOmtDlKO3xXtJxUtI1G+v8QxxBxWHbjt3fkPS2PFvtjZ3tbUdz9eZ7+sddsqaPfqms1i7P1XzTR2fwM4YgRpL08831/ldwFAPOQwiDZfv0j4LeTasbTq5pqllx4e9O9A7p8f0hPX24R9PhBVvGjslqLTO31cxTd91+2wilCyAT7j3Q83pJ/+2Qk2dfY21lY6rvSpcjW8Z7Scf/SnoV48MUvm07dq+R9eVRPk1RfaSzvW1Ttt90zwXTR0uqzfUNSZEHMROSLt9c7z/OkQw4DyEMbPGZ/3m08fKNTcfqq8t98/1+nu5KySz2hKxg5imdC2kO33X7bVFKHEC67j3Q45G0R9IlTjiZuk3zsbqqsuuSXTLhS0a7HCX7zn+5oc7PdK8FbtuO3f8i6d15ttpf6mxv+5NMv8meJKaPdsJNSREHMX+xpd7PGFaAQxHCwDZ3/OSx5113acsDZb4S12LPGx6b1BMHuvX4/pMaPL+7UjImJe3VuVYzT8pqNXOaPQAgGfce6HmvpC855cRaVup9tNxfev1iS6HL0QVLMXK+/lFJt2yoY8aRQrVtx+4tkp5R/k1i0dbZ3paRcYue6Tt/+mjDWHr6aCfcmBRhEPO4pBu2NPgjHMmAMxHCwFaf3/n4W2+4Yu03PW4zqed3nTqjx/ef1NOHejQVXta5okfnxpmZDWf233X7bTPsFQCz7j3QUynpiKR6p5xkayvLTnncZtN8ryB8yVmXo2SW3y3pmg11/kGOrMKzbcfun0ranmerfbizvc22Fn7P9C09fbRhOPFzYxnLzP8gJibpeVsa/EGOYsC5CGFgu3/85VOfa7187QdTeU0kGtPeo716bF9IR0KDyXZXWsqMpH06fyDgp+66/bZe9hJQnO490PNpSe0OOuFONNZW+hnvZZElZDl8SXHZv5T0ig11/hhHV+HYtmP3ayT9OA9X/X2d7W3/tJwFPNNnTR+tFKaPJohx1Lb/w5YG/wc4igFnI4RBRnTcve+XV13SvC2d146MT1mzK6XXXSkZg7ogmJG0567bb5tizwGF694DPS2SDkkqdcrJ13S59tRXV1xu60k5R+FLAXY5StZfb6jzf4ojrDBs27G7Qla355Y8W/XTktZ0trdNpPKiZ/oWnj46peOHIMYJ235S0uVbGvyjHMmAsxHCIGO+9eDhQ5tWNyxrhH4buystJZq4OZudNvtpWa1mTrAngcJw74Ger0t6u5PWqdTrCdaU+1szeUZnvJeMr39M0os31Pnv5SjLf9t27O6Q9P/ycNU/3NnedsdST3q6z5o+2khy+uiUjiWCmFxv+2u2NPh/wlEMOB8hDDLm0z8Klm9d1xhqbqiqWu6yMtRdKRnDmjMAcOLvT991+21j7GEgf9x7oOcqSU847bxXU+4/VOr1LG8MB8Z7ccIFUK+s8WH6Odry17Ydu18u6Wd5uOohSZs729sm5/vl031jF0wfbdRmLDggiMnVtv9wS4P/9RzFQH4ghEFG3f7j315y9eZVe2oq/R67ljnbXemJAyENnMlJFhKXdEznWs3Mdmk6etfttzEuAOBA9xzo+aWkbQ476cWbaipjhmGYKb+S8V6cddFjLfguQ3rp+lp/lCMu/2zbsbs+cS5fmYer/47O9rZvzP7j6b6xJKaPNjIXHBDEZHs9RyVt3dLg7+FIBvIDIQwy7o6fPvay1svW/Ky0xGN7fQv1ndVj+0/qqUM9mprO+URI45L26PxWM0/edfttZ6kFQO7cs7/nVkm/ynY3l6Wv641jTTWV6+06azPeSw7Kxrho+Z9YX+v/G466/LJtx25D0v/KGhcl3+yW9IIvvOuq9ZozfbSUzPTRBDEFEsT88ZYG/z9zJAP5gxAGWfH3P3/yT1svX/t3piszVS4SjWnf0VN6bP9JHTk5qFj2uisl46QuHgj44F233xahZgCZdc/+Hpekx3ThN8EOCGS8bnewrrIsufFgCqHLUQ7KPYvhy6yYpG3ra/13cfTlj207dv+5pM/n0zp73S5d0lwee93zm79XU+5t1TzTR6dSmQli7N2gLK7ng5JesKWBGdqAfEIIg6z5p1898/XrL1399ky/z+j4lB4/0K3H95/MVXelZEzLmj77SZ0/EDDjCQA2umd/z1slfXMZOUHGVPpLnyorLbkqnbM0XY5ycHFjJL3sPknXrK/1n+IIdL5tO3bfKOkeSW6nr+vKmlJtaanQ1pYKbWgqk31fbBHE5GkQE5F03ZYG/9McyUB+IYRBVv37bw48dOmGpudm6/0c1l0pGX26uNXM3rtuvy1M7QFSc8/+Hp+kg0plqtksBjINVRWjbtNVkcqZOZ/DlwJs9bKY30h6MePDONu2HbubZLWUc+Q4ML4SU5uby7W1pVKbW8pVNWd4PSNDFZ0gxt4NyvB63r6lwd/OkQzkH0IYZNWnfxR0b1hVf2Jdc21zNt/X4d2Vllx9Sft1bpam2VYzIWoUsLB79vd8RNLtdp0hbT5hnl5ZW1WXzBswxXSOLmSM5SzfkKRPr6/1/RVHojNt27HbK2mXpJscc1FuSKvr/dqyqkJbV1doTYN/0ft9gpgcLjP3QcwRSVduafBPcjQD+YcQBln36R8F66/YuPLEitoKfy7ef3R8Sk8c6NbjB0LqHxrN56Ic0sXTZz9z1+23TVDLUOzu2d9TL+mwpKpMnC2Xe/J0m67HG6oqrl1sYYz3kqMLmOWHL7Pikl62vtbXyRHpPNt27P6apHfmej0q/R5tWVWuLasqtHlVhfwlZkqVnCAmh8vMbRDzO1sb/Ls4koH8RAiDnPjsTx699rqtq4Pl511tZL/ih/rP6rF9IT11qFuT+dFdaSmxxI3n3FYzT0o6ftftt8WpeSgW9+zv+UdJ78vGmTOdE2lZacmjlWWl1+fixMx4Lwsv1LB/rQYkXbu+1tfNUekc23bs/lNJf5eL9zZdhtY3lmlLS4W2rKpQc23psis8QUwOl5mbIOZbWxv8b+VIBvIXIQxy5nM7H3/LDZev/S+vx8x5pY9GY9p3rE+P7T+pQ10D+dZdKRmjSnRj0rlWM0/ddfttI9REFJp79vdskrRXkifbHyrJnlTrKstCXo+7JZsnZMZ7WXjBRmbX6gFDumVdrY8Z8Rxg247dL5e0U5IrW+9ZV+F9NnTZuLJcpR6X7VWNICaHy8xuEDMkaevWBv8ARzOQvwhhkFP/8IunPtV6+ZqPGobhmEo/OjmtJ/aH9Nj+vO+ulIzjungg4MN33X4bg0kib92zv+e/Jb3eCWfVBT5vppvqqkoMMd5Lzi5SshO+zH3mZ9fV+j7C0Zlb23bsvlTSQ5IqM/k+HrdLm1aWW92MWipUX1my/LpNEJOTzwsHBjHv2Nrg/wZHM5DfCGGQc1/59d6fXr151XZHVPgLntCd6K705MGC6a6UjElJe3QulHlS0tN33X7baWornO6e/T3Pl7TbiWfY2X+6XMa+pprKS519ci/cLkfpL99Y7rNesa7W93OO0tzYtmN3g6wAZkMmlt9UU6otqyq0paVC6xvL5DYN++s5QUxOPjscFMTcLeklWxv8dC8H8hwhDBzhmw8c2rt57Yrc35QscJEejca199gpPbavYLsrJaNb57o0zY43s/+u22+boQbDKe7Z33O/pBudfLb1eT2P1Fb4b3DmST134YszW70k/8oknnVa0nXran1dHKnZtW3Hbr+kuyQ9z65l+kpMXbKyXFtbKrS5peK86aMzWu8JYnLyWeKAIGZa0lVbG/wHOaKB/EcIA0f49I+C/i1rV5xctaK6NmeVfcF7j/P/NToxrScOhPTY/pPqOz1a7LtuRtbYG+fN0nTX7bf1UquRbXfv7/5dST+wjlrnnt5qKvwH/CWeLc46kdPlKN21SnH5D0m6eV2tj/A6S7bt2G1K+pGkVy03LGip92vrKit0WbvE9NEZPQYIYnLyuZLjIOZjWxv8f8sRDRQGQhg4xu0//u3aqy5ZdbC2yu/NekVf9MvfhV/d3T+sx/af1JMHuzUxFWYnnjOg81vNPCVp71233zZF0SAT7t7f7ZbVjW7zxUews051K+sqZ1yGsexBgwlfFl+ww8KXub6wrtb3QY7a7Ni2Y/e/SHp3Oq+t8Lm1OTGg7tzpow0nHA8EMTn5jMlRELNP0jVbG/xcaAIFghAGjnLHTx974XMuXXO3r9RjZLWSJ9kKZqGXRaMx7Tvep0f3ndTBrn7FYnTXnUdU0kFd3GrmBEWD5bp7f/cfS/qnpQ/13J72DMM40VxXuTa3J26mmE53rWxc91evq/X9lCM3s7bt2N0u6dPJPt90GVrXWPbs2C4rF5k+miAmE5+P+fF5k4Mg5gVbG/wPcEQDhYMQBo7zd//7xHtuuGLtl03TlZ0KnmYAs9Azxiam9fiBkB6lu1KyhnXxDE3P3HX7bWMUDZJx9/7uCklHJDWk9vmQ/VOg12P+tqGq/Dm5OWEz3ku6a5aB9T8j6fp1tb5jHMGZsW3H7rdJ+sZSz6ut8D4bumxaWS5vCtNHE8RkYPsJYi701a0N/gBHNFBYCGHgSF/qfPpfnnPZmndnvILbHMBcqLt/WI/SXSkdcUlHda7VzOxAwEfvuv22GMWDue7e3/0pSR9d3mdFdk6HlWWlT1b4Sq7O7kmaLkfprlWGyydoGHrB2hofJwebbduxe7ukH0q6qNufNX10mTavqtCWlvILpo82HFHHCWLy47MoC0FMn6StWxv8ZzmqgcJCCAPH+rd7999/+caVN2asci96M2LYeuDE5nRXOkB3peUYlxXGzI4385Skp+66/TYuUIrU3fu7V0k6JMln34kxc6fGxpqKs27TVZ35k7ORyj/z5+KiAMKXC+7H/mFtje8DHMn22bZj902Sfjn3M6GpplSbV5Vb00evmDN9tGHP3ieIyfhx4tjPpQwHMW/e2uD/Hkc1UHgIYeBYn/5R0LWuue74hlV1qzNSsZc5DkzK65L4y9jEtJ442K1H951U7+AIO9oeXUqMMaNzrWYO3nX7bRGKprDdvb/7a5LembmTpK2nybOr6quqM3tSZryXdNcq42Wz8Bv87toa3484mpdv247dV0v6jc9rVm5qtkKXzavKL5o+2lhyxxPEpPqmBDH2bpAh/Xxrg/8VHNVAYSKEgaN9+kfB2ss3rDzRWFdRbmvFznA3pIueu8CLegaG9ei+k3riYLfGJ2mRbrNpWbPlXDgQcD9FUxju3t99ZWLfZuVcttxAxm26nmysqbg6Mydjuhylu2Y5DF9mDUu6fm2N7whHdXoe7x11PXls+LWnR6b/Y+PK8rI1SUwfTRBj/1oSxNi2QROSLru0wc/EBUCBIoSB433mfx694rqtLY9XlJW6banUaU5Hnc4BYyT5wmgspv3H+q3uSif6FY0x7EkGndLFrWb23nX7baRgeebu/d0/l/Sy3Jw8Uz99lpV6f1td7nuOvSdgwpd018oB4ctcj0lqW1vjm+bITs7jvaNNkl4q6WXxuF5qGKpZVm0hiLFlLQlibNmgD17a4P8CRzlQuAhhkBc+t/Px195w+Zofej1uY9kVOkfdkJJd9tjktB4/QHelLItI2q/zZ2h6+q7bbwtRNM509/7uWyX9yhkn0uQ+Heqryk6UeNxrGe9l8QVnMnxxWPByoS+vrfG9l6N7fo/1jnoNqU1W8PoySVfbXp8JYmxZS4KYZW3Q45JuuLTBT3dqoIARwiBvfPEXT/71DZev/aSxwIkrF9NRL/lcY3kHYs/AsH5Ld6VcGtL5wcyTslrNTFA0uXP3/m6XpEclXeO8k+qCB/3Mqroqz/JuJBjvJd21cnj4Mtf/WVvj+2+OcstjvaMblGjtIunFksozfuNMEGPLWhLEpLVBMUnPvbTB/1uOfqCwEcIgr/zzXXu+f+2Wlv+TVmXOdgBj4wVQNBbTProrOUVM0mFdHM6cuOv225j2Kgt+vb/7/0r6D6efxOYGMi6XcaC5tnLLsk/VtHpJac3yKHyZNSbpurU1vkPFeGw/1jv6/9u78/DI8oLe/59TW5ZK0nvS6UkvszLdk+7pZdI9wICCIMMwA+MV9cp4Fa9eehAdNhX1/sTnepFhE1EUaPiJwiiigOygyIyCOFt6emCYXmftJL0n6eyp9Zz7R1V1KtVVSS3nVJ1z6v16nnqynXzPkjrnfM8n36Vd0su0ELxc25AHZ4IYW7aSIKbiHfrzreva38ZdHvA/Qhh4zt/+11NPvGBz9/aK3sh1nI662m5I5VZoZuYzsysdPDqs0xcmeUO4x7QWxprJBTNP3n/vXfQps9EDx061STouaaOXbmhtkcija7va91Z9iyZ8kYfHe6l0L38k6eZNq9pizXBOHzoz3a9M6PJqSbdIanHFgzNBjC1bSRBT9g4NKzMY7wx3esD/CGHgOX/y5cHItZvWndrYs2pt2W9iF44DU/5ipSsyZ0andPDokA4dH6G7kns9r4UBgHOzND1z/713pTk0lXvg2Kl3SXqf125uqzvaj0ZbI1truFjVJ1xwuNAmHu+l0u0/sGlV291+PIcPnZleJemnlAldXiXpCtc+OBPE2LKVBDFl7dDrtq5r/xp3eaA5EMLAk+79ysErtl+z4ek1K6OtXpmOupbHiuWWNS1LR58/p4NHh3TsOborecC8pCe1uNXME/ffe9c4h6a0B46eWiPpGUkrKjk53XCj27C6Kx4MBFqqTSoY76Vxf986hy/57tq0qu1zXj9vHzszHZB0k6RbjUzocrOkgGcenAlibNlKgpglfWlrd/T13OWB5kEIA896/9cOvWhg28b/bG+NBKp7rvFWN6RyC5ubT+jQ8RG6K3nTKS2ePvsJScfvv/euJIdGeuDoqY9IemstJ2sjbnqGYYz0rVnRV+lFii5Hjf1bNjB8yZmVdNOmVW3HvHauPpY3fbSkV0pa46owotIyCWJs2UqCmKKmJG3d2h09zV0eaB6EMPC0P/3m47+2r3/L/x8KBip8vvFJALPMg9vp0SkdPEJ3JY9LSjqixQMBP3H/vXedbaaD8MDRU1dLOiopbOfJW4+bYCQUfKxnZeeeMi9OhC8N/Ju5IHgpXPpJSXs3rWqdd/P5+djp6YgKp482XB5GVFomQYwtW0kQc5m3bO2OfoyqDtBcCGHgeR/9zo8/MrBt05L/HfdrN6RyH95Mc6G70lG6K/nFBV0+Q9PR+++9y5eDeT5w9NQ/Sfo5J+9wTt0Qu9pbH1/R3rqLLke1XhEdPDbuC1/y/fWmVa2/7rZz8rHTl08fXcmOE8Q0eN8JYtzwd3pI0i1bu6NUyoAmQwgDX/jUvx/97vZrN/xUsXe216ajLruiUuV/z2fnE/rhiVMaPDqkU+fpruQzaUkntDAQcK7VzJCXd+qBo6f2SXq4nnc7O2+O61d2jYVDwTWlCna0ZYfDBRO+2HvNX8IbN61q/Uwjz8PHTpc3fXQlu0YQ0+B9J4hp5N8pJWn31u7oj6m6AM2HEAa+8N4vDwY2r1/99NUb117pp+moyy2s2u0+Mzalg0eGdej4iKbn4ryR/GtSC2PM5MabOXz/vXd5YirMB46e+k9lpq5tyJ2vxhvl9Ma1qzrpcmRzJOHChzWH93ROmW5Jh+t57h08vXj6aKPM6aMr2U2CmAbvO0FMo/5O927tjv4B1ROgORHCwDfe++XBjq1Xrj/Vu66rq/gb3NvTUS9VmFHjSW+alo6dPKfBI8M68vw5pdO0jG0ClqRndfn02c/df+9drnkDPHD01J2SvuyWu2Cl14lQMPBE7+oVO+oWLjhcMOO92LXtVT2wH5G0d+Oq1lmn9uHg6aki00cb9vyNCGLcu+8EMfXe/2ckbd/WHXX1WE8APFhfAxrh/V977LqdL7ji8IqOtlCzjwNT7bbMxRI6dJzuSk1sVgtdmXLhzI/vv/euiXpvyANHT4UkHZZ0nRvviOUsHm1tGVzd2T7AeC+Nq4h4sNXLUvebz2xc2fpGu7b94OmpgKQ9yoQuPy3phSo6fTRBTNEyCWJs2comDGJeua07+l2qG0DzIoSB73zw64du29e/+RstkZBR7lu92bohlbvsmbEpDR4d1qFjdFeChlQwQ5Okp+6/966UUyt84Oip35D0V164O5ZafN2KjufaIuErPXUDJ3yxefttCV/y/frGla1/Xe12Hzw9tV6ZwOXW7Mc11ewHQcxSKyCIqXSlTRTE3LetO/rLVCmA5kYIA1/6yLd/9Lv7+je/PxAw5NfpqA2HT3Yj75cysyud1+DRIR15ju5KuCSuTEuVRbM03X/vXaO1Fnz/0VOdkp6W1N3wm1X1gUx649qVAcOw91GALkf1f/Cq156WOdh7TNLejStbyxrQc/D0VFjSi42FAXV32rX3BDFLrYAgptKVNkEQMy7p+m3d0QtUH4DmRggD3/r4d5/8u91bN91l50ngp3Fgll2+RA1zLpbQ49nuSsPnJnijoZizurzVzJH7770rWW4B9x899X8l/X+uu3FVsPKAYTy1ce3Kaxuw6qoKdjJ8afIppm2/t0g6LummjStbiw6uPXh66kplApdXKTPGS4d9fweCmKJlEsTYspU+D2J+dVt39G+pIgAghIGv/c0PTgxuu3L9TXacAF6cjrqm/Sxjh8+OTevgkSEdPDZMdyUsJyXpmBZPn/2j+++963ThgvcfPbVBmVYwba6+iS2z8rZIeLB7RceAK2/UdDmyeftt73JUjr/fuLL1lyRp8PRUu6Sf1ELwcp2zfxOCmPJvlQQxla7Up0HMA5Jesa07alEdAEAIA19775cPRq7ZuHZoc+/qnlrf/M0yDkyZtcpFPzEtS8ey3ZUOP3tWKboroXzjygYyyg4E/Hu/9BNvCQSMN3rqhlZk5as72g93trXc4KqbM+GLzdvfkPBFkpQyLc0k01+Kpc0Vkl6iCqaPJohxsEyCGFu20mdBTFzSjm3d0RPc8gE0vM4K1MN7v3ywe8e1G55ft6qjreYgo8HjwFS67XZ2Qyq37PzZleiuhEqtWxnVr99xk2odRqXhNzdD6luzYi4YCLS7YrsZ78XmbXdsvJeSTEtKpE3F06YSpqW0ZbngHCGIKf/vSxBT6Up9FMT84bbu6Hu4wwNwTT0VqIcPfO3QwJ6tGx/uaG8JVPrG9/N01Jcta5RfQjllnx2b1iDdlVCBX/ip7br6ijW2ltmIG51h6OymdavWN3QbjVrLp9WLrQ/SVexH0rQUzwYvybRl+4EniHGwTIIYW7bSB0HMEUm7tnVHE9zhATSybgo0xJ9+84e/tK9/832RUNCxCnSzdUMqt+xcd6VH6a6EJWzpXaU3vPJGX9z0IqHgod7VXbsbsj10ObJ5++vX5ci0LMXTC8GLuVzuQhDjuusBQYz9W+nxIOaWbd3R/+IOD6AR9VHAFT76rz9+397+ze8yKj1Bmmg66uVKqHVb5uNJHTo+okePDmvo7EXelMhWiA396mt2a/3qTl/cAFdEWw+tjLbtrut66XLkij2tNHzJdDHKBC9J06p8qwhiXHcdIIixfys9GsQc2NYdvZs7PIB616UA1/nUfxz91o3XXvFquyvSfpyO2payl/jhufFpPXpkWAePDmtqNsabs4n1X9Wj196y1Tc3w/WrOs+1hEM9dbnh+iB8aaYuR2nLUjyVbe1imqpmaBeCGPdXhgli7N9KjwUx5yRdv607OsEdHkA961SAa/3dQ08fv25Td3lTeNINqbayy/ihZVk6fvK8Hj0yrB8/c4buSk0mFAzo7jv3qiva6pcb4+zm7lVRR2+0dDlyYPudCV8sLW7tkjItZ/aNIMZ1FWKCGPu30kNBzC9s647+E3d4AEXrvhwCNKPhsxN7oq0tw1d0r1hZv4pG8wQwlW5kwDC0dUuPtm7pudRd6ZEjdFdqFjddf4VrApjcQ3Mt7/1gIPCsIW13MlUgfLH3ulx1+SV+PWVaimWDl4RDobJVuHqr9j+cZcvffnEpVZe5xC9aDrxHHS+z6AoqX6sr9r2MX7B/OzMlOrL/lu3XpG8RwABoZD0LcK33feWxq3e94Iojq7raI5VUrmup6NMNqbJ9zHVXGqS7km+1tYT1Gz+zTy0Rb/xPoJxzoaM1Mri2KzrgxIoZ76Vxe7rU5dK0dGkw3Xi6+PTRRr32mRYxrqsY0yLG/q10cYuYOUnbbuiOnuQOD6BR9S3A1T709UOvHLhh87+2tYQXZxJMR11b2RX8sJyyLcvSMbor+dIrBq7WwNa+vPeDd25Lpba0s7Xl/Jqu9m47V8J4L3Ztu31djpKXWruYSqSthh5nghj3V44JYuzfSpcGMe+8oTv6Ye7uABpV7wI84SPf/tE9+/o3/3kwEGA6arvKLvOHlT48GcrOrnTilB49MqTnz4zzBvawlZ2t2v+6vQoEjCX+4t66mVqWtHHdCoUCgZoLo8uRvdfgqsvPfmJaC6FLPG2p2qFdCGLs3xiCmAbvO0FMzuOS9t7QHU1xhwfQyDoY4Akf+7cnPzWwbdOv21+ZcFcAc2n5endDsimAKXT+4oweOTKkwaNDmpyhu5LX3PnSbdq6ZV0N7wD3mZyJaedVvTXdkQlf7L3+Vlu+ZeQG1DVLTB9t1GEfaiyXIMZ1lWSCGPu30iVBjKlMAPMYd3cAja6LAZ7xN98//lD/Nb032/2owzgwqjmEWe4B3LIsHR+6oEeODOnHz5xRMpXmDe1yvWs79cbbdld543LvrWtsck43XXtFVScP4700bk9zv5HOtnaJFUwf7cSQ5QQx9m8MQUyD9725g5iP3NAdfTt3dwDlYHYkIOvs2PSL29siQ1ddseaKulUgDAfLlkvKdjiAyVSUDF2/uVvXb+5WLJHUoeOn9AjdlVztp/ZcXfX0GVbe/EVuC2Q621oqPnGcDF+YYnp5uZYusfzpo43C91yp0qufq8Vy6O/DrEkOH0+7y2TWJFu2ssGzJg1L+kPu7ADc8FwGeM69Xzm4dvs1vc/3rO6M1nbCNNd01PXuhrTk6vJ+4fzFGT1yeEiP0l3JVa7tW6PXv6zf9juSGwKZdV1RdbRGlj1Z6HJk1/ZXviEp07oUuiTSpixbrl+0iKm2FFrELLUCWsRUutIGtYh57Q3d0a9zdwfQ6Hs/4Fkf+NpjO/ds3XiwK9oarOWhgG5IqjFoqvyRulRFybIsHRu6oEcO012p0QKGoV9/7U1a09Xu6N2pEYHMfDypbRu7l9wfwhe7tr/8JRdPH20WnT66ktUQxNi/ZQQxS62AIKbSldY5iPnSDd3R13N3B+CG+z7gaR/+5g9/YV//5n+IhIMVzlrNdNTVPbzU/hBd7sNhLJHS48dH9PCRIT13mu5K9bbrug26dd+1db1T1SuQKToeDOO92Lzt5S2dyGvtkqx1SnuCGIe2lSCmaJkEMbZsZZ2CmClJ19/QHT3D3R2AG+75gOd99F+f+D/7+je/2zAMuiFVumyDuyGVu+0XJmb08OEhPXpkWBMz87zpHRYJBXX3z+xVdKnuOg7ftZwMZKZn49px5fpF28h4L3Zt/9JLp62F0CUzfbRl77EiiHFoWwliyr9NE8RUutI6BDG/cUN39OPc3QG45X4P+MIn//3Il3e/oO9O2276TEdt+2NytQFMPkvS8ZPn9ciRIf3oaborOeWlN27Ri3dsds1dzO5Apj0SUc+qKF2ObNv+0ktaWpg+OlZ0+mgHjhtBjEPbShBTtEyCGFu20sEg5iFJt9zQHTUFAC651wO+8XcPPn34+i3d22y52TMdte0PxoZh7zGMJVI6RHcl23W0RXT3nfsUDgVceUerNZBJpU1du2GNo49IzR6+XJo+OrV4+ui6VnoIYhzaVoKYomUSxNiylQ7sf8owtOuG7uiT3N0BVIMpqoFljJyf2BNti4xs7Fm5xs4aC9NR1/4g7MRDY2skpBdt36IXb99yqbvSI3RXqtlLdl6pUChwaSYaR96jVvUnQa3TXk/Pxh2bTtnR89nFXY4slZg+usa3iGFzAUxfzfTVjpXJ9NW2bKUD+/9BAhgAbn1WA3zjA199bOON1214as2KaEup04jpqGt/AKt3N6Ryl811V3r4yLCeePq0EnRXqsi6lVH9z9v3yCjxxO/4jagOLWQuTs1rz7UbbNuYZh3vJVnu9NGNrvzQIsahbaVFTPm3cFrEVLpSm8p9RlJ/f080xt0dgNvu74DvfOjrh16694ZN/97eGglUfGNnOmqbHnWre4i0L2gyMrMrnTilhw+f1LOnxhx7SPSTn3t5v66+Yo0jf6t63vWWepcalnTl+lU1r7jZuhzlpo+OVTN9dKMrQAQxDm0rQUzRMglibNlKG8p9ZX9P9Lvc2QG47Z4B+Naff/tHd+/r3/zxUDAgpqOu9mGksofbWh8k7QxgCl2YmNUjh0/q0SPDGp+e4wQpYvP6lfrFV97ozhuUjTMtbVq7QpnrQi2RhIO76qLwJVHQ2sXTlSCCGIe2lSCmaJkEMbZsZQ3l3tffE/1l7uwA3Hi/AHztY//25F/uvWHTW5iOupqHkOUeZcvcljp1Q1ruCTb3XUvSiaELevjwSf3wKbor5Xvjbbu1fk2n+29WNaxgejaunVf1VhlJOLhLLgleTMtSLJ0LXi6fPtrzFSGCGIe2lSCm/Ns6QUylK62i3DFJW/t7ohe4swNwfb0W8KNPf//493Zcs+GlTEdda9nuCWBK120rG8cklkjpEN2VJEk3XNmtO27Z6r0bV4UrGJuc097r+kSXo4zM9NFWRdNHe74yRBDj0LYSxBQtkyDGlq2ssNxf7e+J/i01YAB2YHYkoArnx6df9szI6LPX9K3d7IYHgoaNA+PCylo99nOpZVsjIb2of7Ne1L9ZFyZm9XCTdlcKBgN66a4rHSnbcvo9WuEsSx2tLWUt6OfwJZ1t7VLL9NGNxKxJzJrkqvfTcmUya5ItW1lBuQ9I+gy1XwANewYCkPG+rxxc2X9V71Dv2q7O5c4suiEVW9bZ6ajr0Q2p3LIvdVc6MqTHnzqlRNL/3ZX2bduol+25yl83tRKFr+2MakV7a8NutI0IXxamj7Zsmz7aF5UiWsQ4tK20iCn/Vk+LmEpXuky5cUk7+nuiJ6j5AvBEfRXwuw997dC23ddv/NGKjtZQqbOK6aiLF+D1cWCqLT+ezHRXeujwkJ4ZGfVld6XWlpDuvnOfWiONbWxZj0Amlkjpho09db+5NiJ4WZg+2nJ0+mjPV4wIYhzaVoKY8m/5BDGVrnSJcv+wvyf6Hmq8ADxTRwWawYe/8cM7bu7f/NWWSKjonZzpqC//Za9MR+3oMZQ0Ojmrhw8P6ZEjQxqb8k93pZfvuVp7t/U1xc1ubHJOe1+wsW431XqGL4unj7bqOn20598vBDEObStBTNEyCWJs2coi5R6RtKu/J5qgtgvAC/VSoKl89F+e+IMXbt/yJ0agtgoi01HX9tDpZABj6zEsYBnS08MX9NCTme5KcQ93V1rZ0ao3vW6vAgH33l7s3LLp2YR2Xt3rm/Bl8fTRzTysNEEMQYz7K9wEMfZvZUG5t/T3RP+LWi4AL9wTgKb0yQeO/MOerRv/u+2BwFLLMh21/ftZ5wCmcJXxZEqHjme6Kz3twe5Kr3vJVm3d0t00N8H2cFgb1nQ5t32Gs/u+ePpoU2Zz5y72V5IIYhzaVoKY8qsBBDGVrjRb7oH+nujdXAUBuLJ+AWDBfQ8+9cNtV66/kemoixfgt+mo7diWpR6yc92VHj7sje5KvWs69Su37W6aG2LaNHVd71oZNiclTgYvlqSkx6aP9nxFiSDGoW0liClaJkGMHVt5zpCu7++JTnAFBOAEpqgGbHTq/OTeaGtkZEvv6nWOhgdMR123/XT0GC6z8NoVUd3+oq16zYu26qnhC3r48JAOnTiteDLlyvf/y/dc7enzt8KZqTU9m7A1gHEqfMlNHx336PTRbnhfMH21vSti+moHy2T6aju28h4CGABOoiUMYLMPfu1Q745rep9dt6qj1bFAgOmo7d/PendDMqop21g0u9JTwxdc013pmr41ev3L+pvqRnlxal4D19U+ALHd4YslKZGdxSjuo+mjPV9hokWMQ9tKi5jyqwa0iCnDN7f3dNzOFQ+Aq+sUAC734W88fvPAtk3/FW2LBGwPD+iGVPsxLPMpuFHdkMo9imNTc3ro8Ek9fHhIo5OzDXu/BwxDv3bHTVqzor25bpqmdM2GNdWXZeMdOGVal2Yx8vP00Z6vNBHEOLStBDHlVxEIYpYwK+mG7T0dJ7naAXB1fQJAcR/51g9/9YXbt3w6HAra94DPdNTO7GcdpqOu5eHbKGMNJ0ZG9dCTJ3XoxKm6d1faeW2vbr35uqY7xzetWamWcNCx9/dSTCvX2qX5po/2fMWJIMahbSWIKVomQUwl3rm9p+PDXOUAuL4uAaC0j/3bkx++uX/z22t+aK+w5st01BUs75FuSOVKZLsrPVin7kqRUFD779yraFukqc7tmbm4dl21wZH3dinJS61dmD7a85UnghiHtpUgpmiZBDHlOCRp3/aeDncOugaAegSA8n36e8e+s/O6K15Z8wM+01Hbv58Nno7a7qNYuGSuu9JDDnZXuuXGLbplx+amO6/HJ+e17wV9tv+98+VPHx1n+mj/VaAIYhzaVoKY8qsNBDG5y62kvdt7Oh7jygbAE3UIAMv7/CPPPnPdpnVXVfXQXl5NSlWXXfPDQa3RAdNR23EUl6tfnxge1UOHM92VYgl7/tHX0RbR/jv3qlSXOz+Lx1Lq39Jjy985Jzd9dK61C9NHN0EliiDGoW0liClaJkFMKX+2vafjHVzRAHim/gBgee//ysGObVetH+lbt2JFxSeoC8aBqThs8Gg3JKeno3ayG1K5detEMq3HnzqlB588qePDo7JqGEvk1puv085re5vynF7T0a7VHW1Vv49zmD6aihRBjFPbShBTtEyCmELDkrZt7+mY4WoGwDN1BwDl+cDXHrv2pus3Hl7V2Rau6ORkOmr799Nn48BUWqfO/Whsak4PHx7Sg4dP6sJEZd2V1q5o16/dcZMMo/luI4lkWjds7K7qPcz00VSmar/uEsRUWwpBTJU3DTfve+1BzB3bezq+wVUMgKfqDQDK92fffPzWm/s3f6s1Ei4vB6EbUtXb4rfpqCvajioeGJ4aGdWDh4f02PGRsrorvf5l/bqmb01TnsfjU/Pad11f2X9Xpo+mQlVtAQQx9m8ZQUyVNw8373v1QcwXt/d0/BxXLwCeqzMAqMxH/+WJd75w++YPBQOBCsIJpqNunnFgKltDJQ8+5ZSaSKZ1aJnuSpt6VuoNP31j057D07Nx7bmm9MxITB9NpcrOAghi7N8ygpglb5Tu206bfqFgkSlJ12/v6TjDlQuA5+oLACr3yfsPf2Zg26ZfLnlSMh11TRcquiHZcwwzsytd3l3pjbft1vo1nU17/raFQ9q4dvHwTkwfDdsqVgQxDm0rQUzRMps3iHnz9p6OT3DFAuDJugKA6tz3g6ce6b96/d6iJyTTUdu/nz6fjtrOh4Niyz41MqqHDg9pOh7Xrfuua9rz1rQsXdeb6YbF9NFwrHJFEOPQthLElF/N8HUQ85CkW7b3dJhcrQA0QohDADTG6dHJF0fbwsNXblizvsKakb2VHZ9NR128EMPZY1j+Km05ik4GMKVc27dW1/atlWlJc/GEpuZjmk8km+qcDQaDsixpLJZi+mgsyar1vCtSQOkyq1+bJWeug5eVa8OK7NnWxaVUXeYSv+jEMXW8zKIrqHytrtj35X8hZUn/awcBDIAGoiUM0EB/8qVH1+25vu9kz+rONqajdnA/m3Q6avv301j0aTptano+pqn5uJLptO/Oz0AgoGAoqGAopGAw2JQzQaHBlSxaxDi0rbSIKVpmc7SIee+Ono7/zdUJgKfrBwBq86dfP7Rr77ZNg53tLUGmo3ZgP5mO2qb9NC77NH/5WCKpqfm4ZmJxmR4eiDYYCimUDV4CSwyeDdStokUQ49C2EsQULdPfQcwzkvp39HTEuDIB8HTdAEDt/uJbP3zDzTu2/H0kFLS9is101A4ew/JXactRdEUAk/2y1PKWZWkmltD0fExzHuiulGntshC8AK6sbBHEOLStBDFFy/RvEPOKHT0d93NFAuD5egEAe3zsOz9+7wu3b/59wwjYdsIyHbXDx7CGfVwou3HTUZe//OJWMOWWnXJhdyXDMC51MQoFQzIC3AbhkQoXQYxD20oQU7RM/wUx9+3o6fhlrkQAfFEnAGCfv/nesW/sekHfa2wJBGyrzBdblumoiy3cDOPAVHsMY8lMd6Xp+fp3VwoEg5daugSDQS408G6liyDGoW0liClapn+CmDEZun5HT8coVyEAvqgPALDX5x959uj1m7uvdyw8oBuSIxdH33dDMuwp27IszWRnV5qLO9NdKdPaZaGLEQPqwlcVL4IYh7aVIKZomf4IYt64Y33HZ7j6AHALOsADLjN09uKeaGtkZGPPylW2V16Yjtqhh345dhQbMR21k2UbhqHO1hZ1trYolTY1FYtrej6mRKq27krBYLaLUSikQJABdeFeTF/N9NWuej8tV6b3p69+QNJnufIAcBP+PQi40Ae/dujK3S+44tiaFdEI01FXuDzTUdu0n0bV+1jNtsSTKU3Ox8rursT00Wj6ChgtYhzaVlrEFC3Tmy1i4pK271jf8RRXHAC+qgMAcMafffPxl+27YfP90dbycximo2Y6anv20/5uSOUun+uuNFmkuxLTR4NKWC3XdYKYakshiKnyptT4ff/DHes73sOVBoDv7v8AnPOX//LEW160Y8tfBst84GQ6ansDgWWXbfLpqB053nnfSKVNjc3OK2GJ6aNBRcyW6ztBTLWlEMRUeXNq3L4fkbRzx/qOpADAZfhXIuBiv3nrjr8aPDL8yZoqNHUOYCpdgZvGgXF+OmpnataOpelGnceYKfiGaVkKhMNqiYQVkCWZplTnmZUAp1kOFGA5sDarXvtvueCYFinFcmBjLDe+n5Yr07JnrQ5vpyXpTQQwANyKljCAB9z3gxP/teOaDS+q6kRmOmr7t4XpqJ3ZlrxvpE1TF+MpmUV+nE6bmXFjDKPyNAzwa4WMFjEObSstYoqW6e4WMQd2rO+4m6sKALeiJQzgAWfGpl/y9MjoSMUVGBtawbihcr5k2Y2YjtrBaqbh4IH1SgBjWZYmCgKYfMFgQOFQUOFgQAEr20IG8DhaxNi/IlrEOFime1vEnLWk3+OKAsDNCGEAD/jd1+0xjw+d33lmdGq2lqdipqN2bJW2HEW/TUdddtkF35iIJVXuhNWXApmAoYBlEsjA0whi7F8RQYyDZboziHnrjes7JriaAHAzQhjAI/7gv+0dO/zc2RdNzcZSrnwIb0Q3pDqXrXqPA1O3/azvdNRLmYolVG0n/mAwqHAoqFAgIMOyGD8GnkQQY/+KCGIcLNNdQcw3b1zf8U9cRQC4HSEM4CHvvGP3E4eOj/xiPJmyvDwdtS0P+Das1MvTUdu3n0ZN67OzG9JsIqmYZc/+hoJBRYJBhQ1DhkmXJXgLQYz9KyKIcbBMdwQxs5LewtUDgBcQwgAe89bbdn7x4NHh/2OV+i+/y8eBcdN01E7up7w4HbUaNw5MLJnSXNr+RwXDMBQOBRUJhbKBDDMswRsIYuxfEUGMg2U2Poh5943rO05y5QDgBUwrAXjUp//j6Bdvun7jzy53Rjs9HXXdZ0PyzHTUNYQwhsPHsNhPjToHannfSKZNTSRSy1a+DRv/AqYspdNpWWKGJfi8osasSQ5tK7MmFS2zMbMmHZK078b1HSmuGACa4t4OoHE+/9AzP952ZU9/dZXtYssyHXWxhZmO2oFtyX7DtCxdLHMgXjtDmPwfmqaptGnKMgxui/BnZY0gxqFtJYgpWmZ9gxhT0t4b13c8xpUCgFfQHQnwsOHzE3tOnr04Wnklu/YKEtNR2xUVOHNgvRDAWJIm5pNKN7h3UCAQUCQUUkswqJAhGZYp5zpZAJWja5L9K6JrkoNl1rdr0p8TwADwGkIYwMN+53V7EieGLuy+MDkbr+1BmemoK1ilLUeR6ailyVhClbQdr0csEswLZIKy1BoKKEDjGLgAQYz9KyKIcbDM+gQxw5LezdUBgNcQwgAe987X7h5+4unTr5idT1Q9/QvTUddeONNRV/bL0/GE4i6fsCgUDMqypHAgoPZQUK2hAJ2V0FAEMfaviCDGwTKdD2J+48b1HTNcGQB4DSEM4ANvf82uHzx2bOTuVMqs+EGZ6aiLL8x01LVvYqnl5xIpzaW9dY6lLUuWJUWCmUCmJcjtE41BEGP/ighiHCzTuSDmCzeu7/gGVwQAXkQtEvCJ37x1x6cGjw1/lOmoa8d01A787bPfiKfSmkmZnj7X0pYlQ1JbMKAogQwagCDG/hURxDhYpv1BzKSkt3IlAOBVtKwGfOaz/3n8gV3XXfGyck5/pqOubR8XymY66nL2MWWaGo8tnoraqHAlhp1/FcO+Y21IChiGkqaphMmgvvBIJY5ZkxzaVmZNKv8aX9W/Pd584/qOT3AFAOBV/PsO8Jlz4zOvODF84Xm7K1uGS8aBcbRSWe8Apm7HsL7dkIqxLEsTBQGMm1g2/H7ashQwDLWFAoqGAgozoi9c/r6lRYxT20qLmKJl2tMi5kFL+iRnPwAvo4YI+NAHv/pY1/ar1w9fsW5FV6lT3y2zIblqOmqPzobkhemox+cTSlrLLN/AljBOHZdAttVRPG0pZdFCBi6tzNEixqFtpUVM+df6staakrRz5/qOw5z1ALyMljCAD/3O6/ZMHX3+/L6JmflUbdEB01GX3k+moy73QWgyVjyAkSS/xxKmlXmFA4ai4YDaQwEFDf7/AXvRIsb+FdEixsEyq28R834CGAB+QAgD+NTbb9917NDxU3fGEimrpodwpqOueVvUsP1s/HTUM/GkYibno5QJYyxJkaChaDio9lBQQfIYuOXBmSDGoW0liClaZuVBzNOS3sOZDsAPCGEAH3vrbTu/efDo8O+b2W4QTEddfGGmo659E4stP59MaTZNF5xiFgKZoDrCQbWHAtyQ0fgHZ4IYh7aVIKZomZUFMXfvXN8R4ywH4Af8Dw5oAn/970f+fu+2zW9ohnFgKt4Wv48Dk/2y3uPAJNNpXUykVc4wKEYFK/bamDCl9694CUHDUNoyFUuZIr5Cwyp3jBHj0LYyRkz5l8NF3/zszvUdv8KZDYD7NABP+fxDzzzWf9X63U6EE0xHXfuDgJ+mo06blsZjSZmVluHTEObS8mWOQpz7ScAwlDZNzafpz4UGVPAIYhzaVoKYomWWDmLGJF2/c33HKGc1AL+g9TPQJEbOT7zwuTPj5+wOJ5iOuvbi/TQdtWVJE/HyAxhn+KMNiWlZMgxD0VCmy1JLkFs26ngW0DXJoW2la1LRMkt3TXoHAQwAv6FGBzSJ337dnsTTw6M3nhufnnfyIbyqshsxHbV9W1/ekg0aB6be3ZAuxhJKuSQD8Ut3HkuZMWSCeYFMhEAG9TgHCGIc2laCmKJlXr6CByTrPs5kAH5DLQ5oIm+/Y9e5J54587LpubhZ8qGa6aiLbAvTUS9btiFNxZJKMJCJ4w/VpiWFDEMd4aA6w0FFAvQshoMPzgQxDm0rQUzRMhe+iEvav3N9J3cVAL5DCAM0mbffvuuRx46PvDGZStf01M501LXz0zgws4mk5kzqyvVkWplXOBBQZzjTQiZEIAMnHpwJYhzaVoKYomVmvvi/O9d3Ps3ZC8CPCGGAJvSbt+6479Gjwx9c9BzNdNQlymY66uXEkmnNpAhgGsm0MuPxtOQFMkECGdj54EwQ49C2EsQUKfOILH2AsxaAX1FDA5rYZ75//F/2vKDvVUxHXapspqNebvmUaWo8nlbhhMq1T+Fc6/aWEaG5fHak2s+xzAxLpmUplkorTU4GMWsSsya5/kHCMqRbdvZ2PsjZCoB7MQBf+uKjz53YuqX72no9tGe+yXTU9u1n47ohmbI0FksWfbgnhCmyfANCmHwBQzJNaT6VFpNeU/mzuwCCGPu3rEmDmAO7ejvv5iwF4Gd0RwKa3PNnx3cPn5+YcOzB0w0PEU0yHXW9/z7jsUTTtq7w4m6bViaMbA8H1RUJqT0UoBIg3r92FUDXJPu3rAm7Jp2V9C7OUAB+R/0LaHK//do9M0eeO3fT2ORc0s5ymY7awWNY+NM6jANTuPzFeEIpi8aUXmValgKGcSmQaQtRHWg2BDH2r4ggpmb37OrtnOTsBOB31LoA6B137H7mh0+dun0+nrTsemgvXgjTUTu2n3UsezqRVJz+LL5hWpaChqHOcFBdkaBaCWSaBkGM/SsiiKnaN3f1dn6BsxJAM6CmBUCSdM9tO78zeHT4HWnTrPkBv2mno26CcWDmkinNpklg/PpAblpS6FIgE1JLkGpCM/zd7S6AIMb+LfN5EDMr6Tc4GwE0C2pXAC55809v/8jg0eG/qaWMpp6O2o7tlnuno06k0ppOpb39wIiyj7NpSZFAQF2RkLoiIUUIZHz997a7AIIY+7fMx0HMu3f1dg5xJgJoFnToB3CZf3jw6Yd2XNN7s21hA9NR27SPjZuOOjMVdTJvVh3Dvr9Vhb9kVLCUU7MjVbWPZU7J4tTsSJWXfflZETAy4UwsbSpp0iKKSmEt7zlmTaq2FJ/NmnRI0t5dvZ1pzkAAzYJ/awG4zKnRyRc/c2rstJvGgXF+OmpnapqOJd1G/caBsSyrIIBBszKz/+JuDQa0IhJWZzikUID/5/gFLWLsXxEtYpaUlvQmAhgAzYYQBsBlfvu1e8ynhi/ceGZseq6ah3YnAwG7N4TpqJc3Hk+IGrIbnnDdxbQyO9QWDGpFJKTOcFABahW8TQliHNpWXwYxf7Grt/MxzjoAzYbqEoCi3vnaPaM/fubMi6dmY8s+f3t1OmpbAhifT0c9EU8oUa/woN4hhUtDES9mNaYlGYahjlBIK1vC6ggHqWB4GEGM/SsiiLnMkKR3c7YBaEbUkQCU9Lbbd/3w4LGR/5FIVtEOwgPTUYvpqJcseyae1LzZPEPhWuyQLeszLUsBw1BHJBPIRMNBBqBrxrcPQYxD2+qbIOYtu3o7ZzjTADQjQhgAS/rNV9/4D48cGXqPZVk1BwJMR13N8o2ZjjqWTGmGqahRI9OyFDQMdUVCWtkSUns4yEHxEIIY+1dEECNJ+sKu3s5vcIYBaFb8cwpAWT77/WNfven6ja8t6wJS725Ihnu6ITk9HXU9Qq9kOq3xRCozCGvJnlCGI+su5xcNO//KRn3eo8X3z7C3bJv3r7I5w0rNAFV6uUTa0nyK0YaaorLIrEkObasnZ02aNKStu3o7z3BmAeC+CgDL+MIjzx654cqerUtePBoxDgzTUdd+DLMf06alsXhCaevygghhbFiWEGbR8rlzdz5lKk7LK39XGAliHNpWzwUxb97d2/kJzigAzYzuSADKNnTu4u6TZy+Ol66puX8cGKajLr3dlqSL+QEMfMdtf1rLyrxagwGtbAlpRSSkSJCqiS/fO3RNcmhbPdU16UFJn+RsAtDsqOkAKNs7X7snduzk+d1jE7MJpwMB+xdmOurlXJxPKEkAg0Y95Gffe23BgFZlA5lwgAa7rvobOVAAQYz9W+bSICYl6U27eztp8gag6RHCAKjI2+/YffLxp06/ci6WWFyRYjpqm7a7MdNRT8USilskMK59eG0yuUm52kNBrWoJqysSVIgaiz/eywQxDm2r64OY9+/u7TzMGQQAhDAAqnDPa3Z+/9Gjw7+Vzo3hwHTUzu1nHcqeTSQ167upqIk9/MK0LAVkqCMU0uqWkLrCQdFAxuNnF0GMQ9vq2iDmaUnv4cwBgAxCGABVefOrdnzskaPDH7crPGA66oKf1mk66ngqremUf1uHE8X4i2lJAcNQVzik1S1hdYRDVGS8em4RxDi0ra4MYu7e3dsZ46wBAJueTQA0t8/911Pf33XdFS+xIxAod2Gmo7ZnW1KmqdFYcukKtWdnRyrzr1+n2ZEuLd/g2ZEqL9uoYf/sO37LzcYWMKR42tJcMkXw5rWKJLMmObStrpk16bO7ezt/hTMFABbwDyQANTkzNv2TJ4YvDNX1Qdah33DFODB1OoamZWk8nuSBFbZp5HvJtKRwwNDKlrBWt4YVDQX5g3jl706LGIe21RUtYkYlvZOzBAAWI4QBUJN3vna3eezk+Z2nLkzOVBMIVBQeMB217Nql8VhSKRIY+DAQMC0pEgxodUtYq1vCaiOQqctxt7sAghj7t6wBQcw7d/d2jnKGAMBihDAAavaunxm4+OSzZ184MTOfqiYQsH9hpqNeysVYQgmHZ0Ii3/HQA7CPj4slqTUY0OrWsFa1hNUapNrj2vchQYxD29qwIOZ+SfdxZgCAPfV3ACjqr/7lR3e+ePuV/9waCS17bak4bKh4rAl3zIbktnFgpuNJTafN8suockyYqveFMWGqL7vMHzg1Jkx152mt+1f5zGyGIVmWNJtKK5H276DUnq1YMkaMQ9ta1zFi4pL6d/d2Ps0ZAQCX419CAGzzlltv/MojR4bebdncyoLpqO0pez6ZWhTAoDa0QPHo3y37h4uGglrTGtbKSEjhANUh15wXtIhxaFvr2iLmjwlgAKAxdX4ATeoz3zv2j/u2bfp5Wy489Z4NyafTUSdSaY0lUyrMx2gJ4+TfuMiytISp7f1R5gqrKTtgSCnT0kwqrZRJxNbwCiYtYhzaVsdbxBw2pF27ezuTnAUAUN97D4Am94VHnv3R9qvW76jposN01LZsi2mauhBLyqymLGOpZe2bppoQxqHt8EkIU/p8tS+EyRcwpIRpaSaVkknjscZVMgliHNpWx4IYS9Ite3o7H+TdDwCl0f4WgCOGz00MPHdm/EK9HnCrezx3pibupumoZVkaixcPYLyKNgpwmmlJIcPQynBYa1vD6oqEqDA14lyla5JD2+pY16QDBDAAsDzqFAAc8Y7X7k4cH7qw6/zFmVg1v8901LYUr/FYgqmo/fuIyhbWwaVApiWsNa1hdYRDNCOu53uIIMahbbU9iDkr6fd4xwPA8ghhADjmbbfvOvXDp0//1Mx83GQ66oKf1mE66olYQnEbnyx4IAeBgtQSNLSmNdNCJhoKclDqce0giHFoWy07y/ytPb2dk7zbAWB5hDAAHHXPbTsfHDw6/L+SqXR5v+CicWAqVek4MPaVfbnZRFJzDC4KOPZQbUlqDQW0tjXTQqaNQMbZ0IAgxqFttSGIsfSNPb2dX+RdDgDlIYQB4Lg3v2rHpx85MvyRcpZ10zgwXp2OOp5MaTrFaKINfeKqcX3EZ957C7XnBTKtQapXjryvCWIc2taagphZSW/h3Q0A7ngOAIBFPveDE/+25wV9r1jqisR01LVtSyptaiyRkmlZ9pVd5TTVVXf7sm2GpDLfIYZTf/cSyzowQ5JTsyNVOj9S3WdHKrFSR/+ORvnLmZY0m0wrniYUtbXyyaxJDm1rVbMmvWPPhs4/410NAOXjXzUA6ubs+Myrjg2df7ZU3a/u3ZCcfjis9Qm/wl8xLUvjiWTZAQwuZ7FDdVuf39+llpWpZHWGQ1rXFtGqlrBCAapdtvztaRHj0LZW3CLmkKS/4B0NAM7V7wGgZh/+2qGOHVevP7Wxe2XXootRxYPxuqMbUkVtQQznwiBL0th8XEmr0uNY2UJ+bwlj79+/xLL1bAlT4/5V3BKmwhXY09rHnS1hSr0DDUNKmpZmkimlmnzcJlrE2L+iOraISUvau2dD5yFqNgBQGf4lA6Cu3vHa3TNHnj8/MD49l6zmocapirvTlW2np6OeqCKAcRPa7qBZWLkpryNhrWuLaEUkpECT/kuMFjH2r6iOLWL+ggAGAKpDCAOg7u55zc4Tjx0/ded8PGkxHXXt2zIVTyhGigF4jmVJ4UBAq1siWtcWUVc41HQVM4IYt5a5ZBAzJOkPOYMBoDqEMAAa4jdffeO3Hjk6/LtWBc3xmY76cnOJlGbTJDBo/MMkajvWliW1BANa0xrRutaIOsPBpukzThBj/0ocDmJ+Y8+GzlnOcABw4jkCABz2mf84et8L+zf/UnkXLPdMR132uAMOtoKJp9K6mEjVVNl2y5gwi5ZnTBh7t6OmGZIYE6aM1Tl23TIkWYY0l0prNpmmUlpFAZ4dI8ZwyTG9vJQv3LSh8+epvQBAo6/NAFCDLzz8zKM3XtM7YMPjdOmLm8+mo06ZpsZiSdkx8W31UzgTwlS1j4Qw9u5jiVTEsTCtQYOIG5JMSXPJtOZS/g1kCGLsX4mNQcykpOtv2tB5lpoLAFSP7kgAGm7kwuQtT58aO1vjo3T9HqIrTyts3RbTsnQxlrIlgPE3Ot7AX+9mQ1I0HFR3W0RrWyNqDQY4a8sogK5JtpXyewQwAFA7QhgADff2O3Ynjg9duPHs+PR88SU8Ng5MFautZNmLsYRSBAwNf1gCGvmeDhhSVySknraI1rSGFQkEOGeXKIAgpmYPStYBzj4AqB0hDABXePsdu8//6OkzL5maiy9q4MF01ItNxBJKkCrAO4/DqMNfKGgYWtkSUk97RKtbwgr7IJAhiLF/JTUUk5T0pps2dHFBAAAbEMIAcI3fum3nY4NHh/9HMjveAdNRLzYdT2repA4MHz84o6ZjbVlSKGBoVUumhcyqlpBCAYP3U1llEsQs4QM3beg6zFkHAPYghAHgKm9+1Y7PPXR46H2Zr5iOOmc+mdJM2lujwPBADjT2/AsHAlrdElZPW0QrW0IKGt7cD7t/mSCmIk9Jeg9nFADYh9mRALjS535w4psD12+8reoLmY+mo06m0xpLpGQ5VMt3anakSo+1/bMjLSxZyexBXpwdacnljVr/LpVtieHz2ZEqPc8NB8PkavcxljY1lfDWyFKGA7/MrEllecVNG7rup1YCAC65pwGAk75y8PljN2zpeUHFFzIfTUedNi2NxhKOzoRECOPke6TIsoQwNYcI5azQPSFM+WuoVwiTY0maT6c1k0h7IpAhiLF/JcsU85mbNnS9kdoIANiL7kgAXOu5M+M3DZ2buOj4Q1xVyzvfDcmyLI3HE0xFDcCxh/r2YFA9bS3qbosoGg66envpmmT/SpYoZlTSb3OWAID9CGEAuNbb79g98+RzZ/eMTs4mSj1AlPfN6h5OKvmpE2HQxXhCKQZWAeAwS5kWTx2hkNa3ZwKZ9lDQtdtq9y8TxBT1zps2dI1ydgCA/QhhALjaW2/f9dyhE6dum4sll69u+mg66slYQnHXN4EhIQLvNj8eZ8Mw1BUJqbe9RevaImoNBfzzXiCIKWdb75d0H2cDADj2+AAA7nfgO0/+1k/svPIvgoFA6YtXxX3+q1ne+XFgZhNJTaXql8BUPyZMRUer/O0w7DuWjAmjmseEqXRUGKfGhCl93jMmjN3XtWLLG5KSlqWpeEoJ0x0JMWPE2L8SQ4pL6r9pQ9fT1DwAwBm0hAHgCft/uv+jDx8e+lQ1Dyr2VZadHwcmlkppOsUoMM2D9h3wxrvBkhQyDK1uDau3vUVrWsMKBwLePV60iClV5h8TwACAs2gJA8BTvvDQMw/uunbDC8u9kjnyn+Lsl3a3mEimTY0nUjKt+j6KGRUuYFR/1MpbtqlawpQugZYwZS7vo5YwFbw9nLu+GZWXnUibmkymlDYbEyPRIsa2lRyWtGtgQ1eS2gYAOIeWMAA85dTo5C0nRkZH7H5AqbTGa/eDumlZuphI1j2AAYBatQQD6m6NqLe9RStbwgrU+V98tIixbfPeRAADAM4jhAHgKW+7Y7d5YvjCrtOjU7NLLeel6agtSeOxhNLkL41huXN9vB38+xbws7ZgQD1tLVrf3qIVkVDdmlwTxNS8kgMDG7oe5B0MAM4jhAHgOW+7Y/foj54586KJ2VjajvIaPR31RCyupNsHg+CJGK59f1q8P13IkNQeCmp9eyaQ6Qw7H8gQxFS9kjOSfo93LQDUByEMAE/6rdfsfOLgseFfjCdTVrHKv1NPFXaXPRVPKMY4vO56pmeH6rY+8ozmeF8bkjrCmUCmpy2iaDjozv1s3iDmnoENXZOcJQBQH4QwADzr7lft+MJDh4f+2Mr7T7iXpqOeSyY1Sx8kAI14Wm/Q+gKGoRXhkDZkA5n2UMBdu9B8QczXBzZ0fZETDQDqh9mRAHje3//n8X/et23Tz1R6UXNytpDllk2k0hpPpFzREsCocCGnZkdatLxh03aXOzdNDTMk1T4DlGFv2TbvX8WzI1W4Alv20TDse++Vs2zF+2fUth2GzedXGW8Qx2aXUvEZoFKmpalkSrGUfU0DmTVp2ZXMSto2sKFriJoEALis7g0Abvflweee3HHV+hvsufg5Ox112jQ1GkvKLb2QCGFECLNMyYQwy66u1nfg0tvheAhz+Ule7xAmXyJtaiqRVsKs/SpJELPkSt4+sKHrI9QgAMCFdW8AcLuPfP1QpP/KntNX9q5e08iHkeXKtixLo/MJpbx2IyCEsTdEaHAIU2ksQAiz7OpsO4KEMIvFs4FMsoZAhiDm8i/Sln78j+emb59LWynp0v8E0sp0YLIKvqfs18W+Z0kyDwz0MboZADT4eg8AdffRbz6+ceD6jU+tWxltsetBxO4H8rH5uBIuGwaGEEaEMLZFCIQwtR5BQphSPzI0n0prMplS2qz8IkoQs+iL9Im55M99/+L8YQdWdSmYyfvc0uKApzDsMZf7nJAHgJ+EOAQA/OLJ7nWn9NSpV/1E/5YHom2RQE0PIQ48jE/EEq4LYJSt4ZLIc6w51nC7tlBQbaGgLFmaS5maTiRV7tjmNb0fSvxy6TKrX5tT79v8cmdT1mcdCmCkhUk/bJ0Ca//gSG438gOawpdVyfcJdgA0CvUTAHW3f3DEyFbUcq/lvi7ne5euZ9umpn7h1u2b/zgUDFR40XOuG9JMPKnptHvre5W0FPFWS5jMkm5pCXNpeVrC2LuPJZqmONaiiZYw9m5HmS1hijEtS3OptKbKHOi82VvEWNLpb43O3nY2kZ6nNpI7JCVDncJXutTPCHQAuOEaD8DfoUlhEBIsEY4ESwQojrtpbubdL+/ffFc9HkCWK3s+mdJEMu3tm4HHQ5hKQwpCmGojBEKYWo+gF0OYmo91DSFMvrRlaS6Z1nRy6UCmmYOY0/HUm749Nvc9ajaOWDasKfjZos8JcoDmQQgDNEd4EiwSngSXCFaKBS2e85Op2Gf3XnfFvkofPux8eEumM1NRm5a7jxUhTH0e3ouHFG4PYaoIEQhhajt+NT/4V7O890OY/KVSlqWZZFozyZT9FWCPBjFx0/r2352dfhu1I1dbMqhZ6nuEOIB3EMIA7g5QgiUCk3JDlaY+xwOWGXhNWN/dtmndFZU8fdv18JE2LY3FE2WPWeDqmwEhjL376OMQptKQghCmjO0w5Px7xGchTL6kZWk6kdJcKm1fJdhjQYwlTT80Gbv16GxilBqWr6V1eViTXuLzXIBjcegAF9W7AVRn/+BIsYAkqOKhSbHPOT9tEI3HO1+3Jvq9jd0rovV88LAkjc7HlfJItcapEKbqhzNCGHu3gxDG3u0ghLF3OxwOYfIlTFNTyZRiKbP2irCHgpjxZPqPvnxh9vPUCrBEtaVYWFPslQtu0hw2oDHXdMDX8lqjFIYopb5HiOJCG2Zmr3nNleu+trqzLbhcsmDXA834fEJxyzv/WCKEqc/D+6XlHQhhlg4pav27EMIULuxod66qQopa97E5Qpj8hRJpUxOJlJK1DJrugSAmZVmP/93Z6V9MW6K1A+xWMqQp9iK4AWq9EwAekm2VEtTl4clyoQrniE9cMzX18tds2/ix1kjIKPXUbdfDzFQsoVnTW3VdQhiHwo9SyxLC2BsiuD6EqTFEIISREyFMbllLUjxtajKeVLKaa7e7g5jU4dnE6x6ejD1NTQAukQtlUkU+N/O/T2gDv+IBE55S0DKlWIhS6nuAdkxP73/Vjs3vCBiGYw8cs4mkplLeGxuPEMah8KPUsoQw9oYIhDA27KM7Qxhbjl+JhYota0maT6U1GU8pXUlrRpcGMTNp82P/eG7mz6kBwMOWCm3yP08xtg18U+8GnFIiUFnuxXsWNXlhbPbDL922+TVOPGzEUyldTKQ92d6bEMah8KPUsoQw9oYIhDA27KPbQxgbrzdldj81LUvzKVMTiaTKymNcFsSkLZ386ujMHReTZpy7P5pEfkuaJT8S2MDV9W6gXPsHRyoNVAIcNTTCK83kV3Zf07vVznFgUmlTY/GkvDo/ZPUhTEWPduVvByGMvdvhkxCmdEhBCFP7Pjo3Rtayy7o0hFn0ZGdZmk2lNRVPLR20uyiIGYqlfuXfxuce5q4PFD+ttTiYyX2ezP8eU3+jIfVuNK+CcVRCWhygFH5NKxV4RjidjtzRHvqPa/vWrLHjAdC0LI3GvDEVddU3AxeGMJU+1hLC1FK24djsQYQwtYUUhDBVbIdR23svZVmaSaY1kygRyLggiImZ1pf//uz073HHB2pmqSCYEWENnK53w1/yWquESnzM/5z3B3xr9dx89x1XrPxu7+rOllovmGPzCSUsb7dqJYRxKPwotWyZT6GEMGUuTwhjwz4SwlRTdsq0NJ1IaSaVLmtD6hHEWNLF712cv/WZ+eQEd3ugbgrDmqQWQptcUJPiMKG2Kz5cI9tipVSoUviRvzmQtXl6euft1234h872lmW7xpU6cS7GEoqZ3u9WbFS4QCXjwhDCFFmWEMbefSSEsWEfCWFqLTtpWppMpDSfC2QaFMSMJtPv+uqF2a9wlwdcx1JBMKOCwIagpjnwQO5ieeFK/itY8HmYvyNQva3T0z/z6v5N74uEghVfKKfjCc2k/TGuGyGMQ+FHqWUJYezdR0IYG/ax+UIY+/dxYYmEaWoinlTcNCssq7YgJmlZD332zPQbubsDnpYfzuRel8Iauj41Qb0b9svOChQq48XfB42WG0C52BhAIS0k+mbex9yUgcnsz11vz+zMu165Y8v/rORCOZ9MaSKZbp6bQb1DmDJ/0bYQpoYHs6r30YFxYQhhHCi7xIKEMDYeax+GMLnPLElxM62JeEqJgkDGgSAm/sRM/I6DU/GTVF8AX8vv8rQooJGUPDDQl+YQebzejcpkA5awFocphV8HOVKoQ3gSyb73ch8LX5G892ZEi1ta5UKVOUnz2VesyMs3F/mfSMb++oXX991SzkUykUprPJmS5aPJDWt7cCGEIYQpUrZh/7Fbeh8N58oub3W1vgNLbwchTBUxiP3nejUhTP4XlqT5VFoTiaRS2W6sdgYxUynzz754fuYTVIGAppcbnyb/lch9zvTcHql3Y8H+wZHCYCVc8DnTLsPOIKUl7xXJvlpKBCz5ny91bqckzeQFLHNaHLbM+ilcqcTtwfR3+7f0bFzqApk2TY3GvDsVtTMPLv4LYZx8AG1ICFPj/jkZwti2j4QwNe7j5W+QuoUwZe+jYd92OBI0GWXvn2lZmkulNZlIySyZ6Je/dWlLT33p/MydM2mT8SQALKewq9OlF2PSuKje3Uz2D44Uhir5n9NFCLXIhSntRcKV/I+5z2tpMRVTJmjJf81mP8Z8cjzzW/sUa3UWzDuHgwXndK5LVa7rVEJSKmKaxn/rinx8S8/K9mIXSMuyNDqfkB/vToQwhDCEMC4OYZb4dUIYb4Yw+UzL0mwqrclEskgLy7K20HpkKvYnh2cSx7IPVwktTKNbOEtL4RgTALDoeqLFLWcSuc8JaAhhaglZAireJYOQBdVqk9SafbXlfV340YlWUnFJk5Imsh9zL69cJHOtfVq1OIwq1cIn/+uljqepTOiUa9kT0+UtfoqGUetn5zbfvnnNt9atiIYKfzY2H1fCpw043RLClA4pCGEIYQhhCGG8E8JUcIov+nHasjSTTGkqkcobVG3pX55MmV/9UqYbUpsy/+jJ1UU6snXb5R62FnVVKPJ57hXPeyWp/gFNxywWzkhKMFgwIYz2D44E8x7WCh/gGI8FlYpkKzKd2Y/tkqJ5H+vVBS0uaSz7Gs+GLfMuPF6BvApgfmWwVYtbALXYcD7OS7ooaVqZVj65j3OqYVDgq6emX3L7tr5PtbeEL10jJ2MJzZn+7UJLCEMIQwjT7CHM5Sc5IUz9Q5h8KdPUVDKtmWSqZAGmdOH+8blXD8dS0yWKbsvWVTqzH7skrcrWZ2p9GItrcTgT00I359w/O5q2izPQZFJ54Uzu2pCg9YzPQpjsALiRgrAlQtCCGrRIWpF9rcxWVDqz32+UMUkjks5lwwa3CGePU5cWAqpoXtji5PE4q0wIdVEOhlA7ZqbfeOv2zb8fDAQ0FUto1vT3GGaEMGq6EKbSWIAQZtnV2XYECWFK/ciwb1s8EMLkS5imphNpzaYW5xnnE+l7vjE6+69VXPZDyoQxqyX1ZF9O/VMpqUwwk+sWnfunyYT800UaQHG5bv+EMzXcM+suG7YUjpuRC1uAWqyQ1C1pbfbV7qKL1TOSTmQrLG7QKmlD9nitUe3/QavUGUmHshW3url5fvZ9O7d03xkPBIxmGEa++tmDCGEIYYqUSwhT9REkhCn1I7eHMEtsrWHf8YubpibjqfR0Kv2D+85Mv8mmW0CLpG2SrqvzrScuaVTSBUmn6n2fB9DQ5538cCamJurW5JoQJq9lS2HgQtgCO62SdFU2UGh34fbFJT0gacpF23SjpBc0+HpxQtKPpPpOSvSzvV27Oi3rDQen5r8VkiIGrezqe6Mp5xeNQLwjEmpxdDv8cvM1avtlo5mPnRu222je42c4sfVGY46dlekqa1mWLEuyLFmyLJlW3s9My8osI1lmdjlJMi3LtCQrJaWnEunYRCp1YTRhnrbxUG+RtK/Bf+7Tkn6gGroUA/C0wvGn4n5sNRNqxErzWrcUjhHBoLhwSjRbsVjn8u0cl7sCGCnTxajR5+Z1kvoknVSmO9KYHO5j/tI10Su2dbb+lSGtmQsEnvun05Pf4jRy8/0aAHwtv6tQ7h8SuX9axqss01CmVXCPMgHMSpfUOQA0r1yvl8687CCtTEuZS+NPHRjo8/Tg4I4/WBUELrlXhPcX6uzlcn8Ak3NC0hNy10B2XcqEID3K9B8PNXh70soEVhe0MDPUtGz6z9nV0UjHf9+w4vNBw7g2V+F98OLc//7uhZlDnEoAgDopFrwUSijTeqQc7coELSuV6Vq81gV1cjN7H891R7rAnx1Amc8CuQHAY8oEM57pymR7CJOdmahwel5auKDRdqn+/ZxrEVNmXJhnlRnMzm3XjU5lgpkVyowP06GFgXkbJaVMK6JJZfqUT2lh8L+yA622YCB4z5VrDrQEjJcsutJbmvv2+am3HZqMneR0AgA4JKjMPxSMCu5d+a1oA1qYDSk3cH5uwoFGdvGPa2Fw3tw/TqayL2ZPAmCHhPKCmQMDfXG3bmjN4cj+wZGAMsl67kUrF7jVFmXGNlnpse0eU+a/XGeU+W+Rm/tJB7PXgfwgtrXE1/U0p0wgM1vkNZ9/TN9x1dp3d4QCdxW9spvWmc+dmnjb0HxygtMJAGCTgBaCl3L+k9tS5F47p0z40i7nZjkqJqnF/42ez/uYC17ms8sBQD2Z2evPnKT5AwN9rpmNraoQZv/gSGvehb5VtHSBt6yUtFELXWu89P6NKxPKjGY/Oj42ioMVzhYtTDGfGxcqUuKV+5kT3aDM7MV57vW9K160rbPll5daeDZtHv7kyfE/mE6ZTKsJAKilDm7k3YdywloIWfK78+e3MC82SHxStY0pl5upJJ4ta9F0sgWveN5HWrEA8ArXhDJlPXxmx3Vp10K3A2YIgV+ElekTvUqZQGaV3DlrUimWMq1jRiVdzH7u56a9hjJBTLjIK5T3MVLk+8Hs94PZ16JA5+ZV7df+9LqOXyrnunhqPvnYp4cvftrKTqenxaO4M6MDAKBQ7h8Kbbp8NtCWvJ9VUse2svf7VPZ1UZlWn7kQJZn9fv7Hwlfu+yZ/IgBN5tI/YiXN1nOw3yUfNvYPjrQo04+0UwQvaK6KUpcW+lF3Zl9R1beJb7UsZfpaTxS85vnTXiYsKfSTazuue8ma6N8YlhUt9xefnIrd/89np76vhWDIyF4nU3mv/HAmoYXQJpb9OQDAu4JaHKIUvvLD/9wYL7lKfm5at1wAkgtT0nmvZPaenirys5QuD/3TygxuS6ACAJVLKDtcwYGBPkfH5LwshMm2eulUpstGK38LYNH50qqFQWhzr3Zl/nvVrsbPGrSUpDLhTP7AtbnBa5u2wrZzRdua1/R0fjFoGBskSVZ5DVksST+eit37lbNT/7HMeyakTHgXzH4MZL+XX7GOU2kGAE9o1UILy0D2Gp4LUfI/WloISerZQnJGmdaxAIDqpZUJZGaUCWVsvY4vCmH2D450KTNlXZjjDlQlrEwgE1XpQWnb5K6wxtLi2YRyMwrNKNN6xrfhQHdLqOXXNq3+TDhg7Fp8RMoOYlL/MTb7O/85NnuEtz4ANDWj4GMj751nlWlxCQConZn3fDRnRyBjSNL+wZGwpPVq7PSyQDPJNWFu1UK/8NznpQapbUSXwFxfyfxwZjbva8+OPRM0DOMdV6/9UFswcPtlP7TKv7amLU1+5ezkWw9Px8/wtgaAphMouGe6QVKZWRUZowwA7JVWtjdBLVNgG/sHR9olbZA3xroAmlmub3luRqFyX2EHz+/cCOO56Z7zP5+Vi0Oae65ae8/KcPAtJReoIIiJmebJzwxPvONcPDXD2xQAfC+gzD8yLbm3tehFZbofAwCcEVNm3M3pSlvHGPsHR64Wg+4Cflc4o1Co4HuRgu/lzzCU/71KrxVxLQ5lckFN7pVoxMH4tc2r77iiNfyhZResIIiZSpmPHXh+7I/mTSvJ2w0AfCegTOhiyBvddC1lWsNwTwIAZ6WVnaX2wEBfWfcHY//gyJViDBgA5VdC88ObXFiTm/Y5972AFoKdgBaHOPkDGipbQZzTQquawpetswi9fsOKXds6Wz+b3b5lqrCVteQ+H099/RMnx/+StwkA+IIhd4zxUq2YMuPDAACcZyrTMmZ8uTDG2D84ElFmPBhmQgLQKLmm3blZhPI/z59tIllLRfila6JX/MTaji8a0uqyf6nCIObpucQnPjcy8WX+pADgSfkD7ObPcORVo8qM4QYAqI+0pHFlWsZYS91otH9wJCqpS5lZXRgfBoCvXBtt6fz5K1Z8PmgY11T8yxUGMQcn5v/oW+enH+aoA4AnBPLqxbnppf3ClHRKHh5IHwA8Ki7p3IGBvstmqzMKv7F/cMRQZpak9uzHFhHKAPCwtmAgeM9Vaz/ZEjBuqbqQCoIYU4p95/zM2x+dmHuWow8AruT1rkaVmFGmRQwAoL4sSaMHBvouFt6AlpXtslQ4Za6TM64AgG3ecfW6P+oIBd5Q2yW0sn+MJk1r9AunJ9/29FziAn8BAHCFXPBi5VWOm8U5ZcZeAwDU37Sks7nuSUYtJe0fHMkNxJk/20r+4Ju5wToBoCHevGXNL61rCf2hLYVVGMTMpc0Tfz108V0Xk+k5/hIA0BD5wYtXZjZyQkqZbkkWbwkAaIiZAwN9p3M3JkdluzflhzK5j4G8j4Ei3zP4OwGoxc9uWNG/rbP106qi1Z5laVbF+tBXGMSMJVP/+fHnxz9e4wNEYJl9MLS4aT0ANLtcXdJS8wYvhSaVmUYVANAY4wcG+kZdW2HPC28Kg5nAMp+X+plE9yn4S+GsDWaRr0stm17iZ8UqrEt9XenyhevXEhXkJQdIXG76N1y6nuZmnCqmWPCdu/7mP8yECn4eKCgj//dDBT/PD5EKr8m5381/5beiDBbZpmCR6zsABMq4rzR7veGMpASHAgAa5mRT/td0/+BI/gNA4QOBUeIVKHGTL/zvc/7DzFI/K1aWlihXSzwALade/yE3a/xdq8ryl5pCcqlyS/1euozlzCLLmDb83pLBCqEDUPK6ngtz8gOcXHAUzrtu5gc9RnaZ/I+BvDICeT/LD4xouQm4B8FLZRKSTnMYAKBhpqg4AgBQo/2DI7mgJhfm5LrfFna3XeqVv3zh73K/BhYE1JyD69plXNIUhwEAGiJFpQ4AAJfLtvQJaGEg/MLwptj3Cj/P/0g3LnhNfqvepVrAYnmWpBEVG/cMAFCXGxoAAGgi2XHXQloIdcJaHOgUfl34vdxH6hFwUv7gugQv9pqTdJ7DAAB1Z1J5AgAAVcmOsRbW4jAnlPe9Ut/PBTlAIcZ4qZ/zyoQxAID6mSeEAQAAdZdtjZMfykR0eXgTKfg6F+RQf/GXXFcjxnmpr7SkUyLsAoB6OkclBgAAeEp2jJyIpJbsx2De57nQJpL3NV2n3Cl/6nrGJ2mMKWUG6gUAOC8l6TkqJAAAwPf2D47kQplcMFP4eS68yYU51JGckT/OCy0w3OGMpDiHAQAcN3JgoG+OCgYAAECBbGubVi1ucdOSfYULvkd9amm5KaUDosWLGyWUCWLoBgYAzrlwYKDvoqg0AAAA1Gb/4EhIC4FN7lUY4OQ+bxYMsOst48p0TQIA2O9SACMRwgAAANTN/sGRXGua3Ks17/P81jZeZOR9ZEppb7GUGaQ3xaEAANuYks4dGOibLnazBAAAgAtkZ47KD2raCj7mwhs31OMCBQ/yBC/eNS/pHIcBAGwRl3TmwEBfovAHhDAAAAAelB1suFULrWnatNAVKhfUBB1YtZFXhyR48ZcLkmY5DABQNUvSmKSLBwb6rFI3UQAAAPhQdryadmUCmbbsqzXvFSmzqFzwYuVVMuE/pqQRMY4PAFRjWpnxX1LL3VABAADQhPYPjgS0EMzkQpqWgu9JmW5HPJg3hxlJoxwGAKjoujl2YKAvXs7ChDAAAAAoKjs+TasWWtO0a3FA08JR8qWzkmIcBgAoyVKm5cvFcsOXHEIYAAAAVCXbkqZdi0OaXFDTpsUD98I7kpJOi25nAFAoJWlS0uRy3Y5KIYQBAACAI7JTcncoE8i0F3wMcYRcbSL7AoBmZynT5WjqwEBfzYOXE8IAAACg7vYPjoQlRbXQeia/FU2YI+SKh47TyrSKAYBmNKdMl6PpAwN9to2LRggDAAAAV8kGNB3KhDLR7Kst+5H6a/3ElBkfBgCagSVpXpngZebAQF/aiZVwEwMAAIBn7B8cybWYiRa8IhwdR4xlH0gAwI9Skmazrzk7W7yUQggDAAAAz9s/OBJSpvVM7pULZ1o5OjUxJZ2SlOZQAPCJmLLBy4GBvrrPBEcIAwAAAN/KzuCUC2VyH3MtaagLl2dG0iiHAYBHxZTpZjQnab4erV2Wwo0HAAAATSnbtSm/1UwuoGFg4Mudyz7EAIDbuSp0KUQIAwAAAOTZPzgS0eXhTLN3bUop0y3J4h0CwEXSygQusdzLbaFLIUIYAAAAoAxFujblZmxqlxRsgkMwKeki7wQADWJJiisvdDkw0Jf02k4QwgAAAAA1yraeyR9vJjeLU5v8E9BYks5ISvAXB+AwU5nAJa5M4BKXlDgw0Of51niEMAAAAICD9g+OtGhxMJP/CnhsdxKSTvNXBWCjtBaClrik+IGBPt+GvYQwAAAAQIPsHxxpVSagye/a1CZ3t6AZlzTFXw9AhdLKBLkJZVu2KBO4pJvpIBDCAAAAAC6U7eKUC2Xyw5k2SS0NrMtbkkayD1QAUCjXlWhR4HJgoC/FoSGEAQAAADxp/+BIfjiTH9K0Soo4vPo5Sef5KwBNy5KU1ELQcunzZmvZUilCGAAAAMBn9g+OBLUQzLTkfd6a/brFhtWcVyaMAeBfybxXLnBJeHFWIrcghAEAAACaTHa67RYtBDO5j7mQplVSaJli0pJOKdP1AIA3mVoctOTClqSklB9mI3IbQhgAAAAAl9k/OBLS5SFNS8HHaUkXOVqAa+W6DaW0ELKklA1a6DpUf4QwAAAAAKqSbVETKvIKSgrnfc5zB+CMXEuWwpAl15KFwXBdhoshAAAAAEdlx6gpFdbkf+T5BFhgKhOo5L+S+Z8fGOijO6DHcJEDAAAA4Ar7B0cMLYQyhQFNsOBnQY4YPCytywOWRUELAYs/EcIAAAAA8JxsYJMfzAS0OKAp9r0ARw4Oym+5ktbioCWd/30GvG1ehDAAAAAAmkI2uCk3rMl/Ma5N8zGVCUxyH4t9vihcIVhBObiQAAAAAMAy8gKc/GAmUMb3AtnnLqPgazjHUiYkKedVNGAhUIFTOPkBAAAAoM6yM0sVBjNLfVTeR6Pg89xzXbDI94r9zlLPh9U8I1rZV6H0MsuaeR+tIl8XvswiXy96MY4K3O7/AZZUtFkU5LbHAAAAAElFTkSuQmCC",
            })
          ))
      );
    };
    const vn = () =>
        (0, i.createElement)(
          "div",
          null,
          (0, i.createElement)(
            "p",
            null,
            (0, T.__)("Result based on your search:", "wp-module-help-center")
          ),
          (0, i.createElement)(
            "h4",
            null,
            (0, T.__)(
              "Sorry, we don't have any content for that yet.",
              "wp-module-help-center"
            )
          ),
          (0, i.createElement)("hr", null),
          (0, i.createElement)(bn, null),
          (0, i.createElement)(
            "p",
            null,
            (0, T.__)(
              "This tool is being built and doesn't always have a match.",
              "wp-module-help-center"
            )
          ),
          (0, i.createElement)(
            "p",
            null,
            (0, T.__)(
              "In the meantime, try searching our",
              "wp-module-help-center"
            ),
            " ",
            (0, i.createElement)(
              "a",
              { href: "https://www.bluehost.com/help" },
              (0, T.__)("Resource center.", "wp-module-help-center")
            )
          ),
          (0, i.createElement)("hr", null)
        ),
      In = (e) => {
        let { content: t, noResult: r, postId: n } = e;
        return r
          ? (0, i.createElement)(vn, null)
          : t && t.length > 0
          ? (0, i.createElement)(
              i.Fragment,
              null,
              (0, i.createElement)(
                "h4",
                null,
                (0, T.__)("Follow these steps:", "wp-module-help-center")
              ),
              (0, i.createElement)("p", {
                dangerouslySetInnerHTML: { __html: t },
              }),
              t && t.length > 0 && (0, i.createElement)(mn, { postId: n })
            )
          : (0, i.createElement)(i.Fragment, null);
      };
    var Sn, wn, Rn, jn, Pn, On;
    function En() {
      return (
        (En = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        En.apply(this, arguments)
      );
    }
    var Tn = function (e) {
      return x.createElement(
        "svg",
        En(
          {
            width: 248,
            height: 72,
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e
        ),
        Sn ||
          (Sn = x.createElement("rect", {
            width: 89,
            height: 14,
            rx: 7,
            fill: "url(#loader_svg__a)",
          })),
        wn ||
          (wn = x.createElement("rect", {
            y: 22,
            width: 233,
            height: 10,
            rx: 5,
            fill: "url(#loader_svg__b)",
          })),
        Rn ||
          (Rn = x.createElement("rect", {
            y: 38,
            width: 248,
            height: 10,
            rx: 5,
            fill: "url(#loader_svg__c)",
          })),
        jn ||
          (jn = x.createElement("rect", {
            y: 54,
            width: 140,
            height: 10,
            rx: 5,
            fill: "url(#loader_svg__d)",
          })),
        Pn ||
          (Pn = x.createElement("path", { stroke: "#EEE", d: "M0 71.5h248" })),
        On ||
          (On = x.createElement(
            "defs",
            null,
            x.createElement(
              "linearGradient",
              {
                id: "loader_svg__a",
                x1: 89,
                y1: 7,
                x2: 0,
                y2: 7,
                gradientUnits: "userSpaceOnUse",
              },
              x.createElement("stop", { stopColor: "#D9D9D9" }),
              x.createElement("stop", {
                offset: 1,
                stopColor: "#D9D9D9",
                stopOpacity: 0.3,
              })
            ),
            x.createElement(
              "linearGradient",
              {
                id: "loader_svg__b",
                x1: 0,
                y1: 27,
                x2: 233,
                y2: 27,
                gradientUnits: "userSpaceOnUse",
              },
              x.createElement("stop", { stopColor: "#D9D9D9" }),
              x.createElement("stop", {
                offset: 1,
                stopColor: "#D9D9D9",
                stopOpacity: 0.3,
              })
            ),
            x.createElement(
              "linearGradient",
              {
                id: "loader_svg__c",
                x1: 0,
                y1: 43,
                x2: 266.243,
                y2: 43,
                gradientUnits: "userSpaceOnUse",
              },
              x.createElement("stop", { stopColor: "#D9D9D9" }),
              x.createElement("stop", {
                offset: 0.516,
                stopColor: "#D9D9D9",
                stopOpacity: 0.2,
              }),
              x.createElement("stop", {
                offset: 1,
                stopColor: "#D9D9D9",
                stopOpacity: 0.8,
              })
            ),
            x.createElement(
              "linearGradient",
              {
                id: "loader_svg__d",
                x1: 138.754,
                y1: 59,
                x2: 1.495,
                y2: 59,
                gradientUnits: "userSpaceOnUse",
              },
              x.createElement("stop", { stopColor: "#D9D9D9" }),
              x.createElement("stop", {
                offset: 1,
                stopColor: "#D9D9D9",
                stopOpacity: 0.3,
              })
            )
          ))
      );
    };
    const Hn = () =>
        (0, i.createElement)(
          i.Fragment,
          null,
          (0, i.createElement)(Tn, null),
          " ",
          (0, i.createElement)(Tn, null),
          " ",
          (0, i.createElement)(Tn, null)
        ),
      kn = () => {
        const [e, t] = (0, i.useState)(!1),
          [r, n] = (0, i.useState)(!1),
          [a, c] = (0, i.useState)(""),
          [s, o] = (0, i.useState)(""),
          [u, l] = (0, i.useState)(),
          { query: f, refine: h, clear: d } = Qr(_r, undefined, undefined);
        const { results: p } = (function () {
            var e = (
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
              ).catchError,
              t = pr(),
              r = rn(),
              n = r.uiState,
              i = r.setUiState,
              a = r.indexUiState,
              c = r.setIndexUiState,
              s = en(),
              o = s.results,
              u = s.scopedResults,
              l = (0, x.useCallback)(
                function () {
                  for (
                    var e = arguments.length, r = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    r[n] = arguments[n];
                  return (
                    t.use.apply(t, r),
                    function () {
                      t.unuse.apply(t, r);
                    }
                  );
                },
                [t]
              ),
              f = (0, x.useCallback)(
                function () {
                  t.refresh();
                },
                [t]
              );
            return (
              or(
                function () {
                  if (e) {
                    var r = function () {};
                    return (
                      t.addListener("error", r),
                      function () {
                        return t.removeListener("error", r);
                      }
                    );
                  }
                  return function () {};
                },
                [t, e]
              ),
              {
                results: o,
                scopedResults: u,
                uiState: n,
                setUiState: i,
                indexUiState: a,
                setIndexUiState: c,
                use: l,
                refresh: f,
                status: t.status,
                error: t.error,
              }
            );
          })(),
          m = (e, t, r) => {
            const n = e.replace(/\n/g, "<br /><br />");
            o(n),
              l(t),
              ((e, t) => {
                localStorage.setItem("helpResultContent", e),
                  localStorage.setItem("helpPostId", t);
              })(n, t),
              ((e) => {
                localStorage.setItem("searchInput", e);
              })(r),
              pn("search", t);
          };
        (0, i.useEffect)(() => {
          const { content: e, postId: t } = {
            content: localStorage.getItem("helpResultContent"),
            postId: localStorage.getItem("helpPostId"),
          };
          e && o(e), t && l(t);
          const r = localStorage.getItem("searchInput");
          r && (c(r), h(r));
        }, []);
        const g = (0, i.useMemo)(
          () =>
            (0, Cr.debounce)(function (e) {
              e && 0 === e.length && d(), h(e);
            }, 300),
          []
        );
        return (
          (0, i.useEffect)(() => {
            g.cancel();
          }, []),
          e
            ? (0, i.createElement)(
                i.Fragment,
                null,
                (0, i.createElement)(Hn, null)
              )
            : (0, i.createElement)(
                i.Fragment,
                null,
                (0, i.createElement)(
                  "div",
                  { className: "search-container" },
                  (0, i.createElement)(
                    "button",
                    {
                      onClick: () => {
                        document.getElementById("search-input-box").focus();
                      },
                    },
                    (0, i.createElement)(on, null)
                  ),
                  (0, i.createElement)("input", {
                    type: "text",
                    id: "search-input-box",
                    style: { flexGrow: 2 },
                    value: a,
                    maxLength: "144",
                    placeholder: "Ask me anything...",
                    onChange: (e) => {
                      c(e.target.value),
                        m("", void 0, e.target.value),
                        n(!1),
                        g(e.target.value);
                    },
                    onKeyDown: async (e) => {
                      "Enter" === e.key &&
                        (await (async () => {
                          t(!0);
                          try {
                            const e = p.hits;
                            if (
                              e.length > 0 &&
                              e[0]._rankingInfo.proximityDistance /
                                e[0]._rankingInfo.words >=
                                0.75
                            )
                              return void m(e[0].content, e[0].post_id, a);
                            const r = await nn.getSearchResult(f, "helpcenter");
                            m(r.result, r.post_id, a);
                          } catch (e) {
                            console.log(e), n(!0);
                          } finally {
                            t(!1);
                          }
                        })());
                    },
                  })
                ),
                (0, i.createElement)(
                  "div",
                  { className: "attribute" },
                  (0, i.createElement)(
                    "p",
                    null,
                    (0, i.createElement)("span", null, a ? a.length : 0, "/144")
                  )
                ),
                (0, i.createElement)(In, {
                  content: s,
                  noResult: r,
                  postId: u,
                }),
                p.hits.length > 0 &&
                  (0, i.createElement)(
                    "p",
                    null,
                    (0, i.createElement)(
                      "b",
                      null,
                      s.length > 0 ? "Other Resources" : "Search Suggestions"
                    )
                  ),
                p.hits.map((e) =>
                  (0, i.createElement)(
                    i.Fragment,
                    null,
                    (0, i.createElement)(fn, {
                      searchTitle: e.post_title,
                      onGo: () => {
                        c(e.post_title), m(e.content, e.post_id, e.post_title);
                      },
                    })
                  )
                )
              )
        );
      },
      xn = (e) => {
        const t = k()("AVE0JWZU92", "eef54890add97ea2583ff1e417ff86ea"),
          r = dn(),
          [n, a] = (0, i.useState)(!1);
        return (
          (0, i.useEffect)(() => {
            (async () => {
              try {
                const e = await P()({
                  path: hn + "/capability",
                  method: "GET",
                });
                a(e);
              } catch (e) {
                a(!1);
              }
            })();
          }, []),
          n && r
            ? (0, i.createElement)(
                "div",
                { className: "nfd-help-center" },
                (0, i.createElement)(
                  ar,
                  { searchClient: t, indexName: "nfd_help_searchable_posts" },
                  (0, i.createElement)(
                    yr,
                    { indexName: "nfd_help_searchable_posts" },
                    (0, i.createElement)(Wr, {
                      hitsPerPage: 3,
                      getRankingInfo: !0,
                    }),
                    (0, i.createElement)(kn, null)
                  )
                )
              )
            : (0, i.createElement)(i.Fragment, null)
        );
      };
    var Mn, Dn;
    function Zn() {
      return (
        (Zn = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        Zn.apply(this, arguments)
      );
    }
    var Un,
      Bn = function (e) {
        return x.createElement(
          "svg",
          Zn(
            {
              width: 24,
              height: 24,
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          Mn ||
            (Mn = x.createElement(
              "g",
              { clipPath: "url(#close_svg__a)" },
              x.createElement(
                "g",
                { clipPath: "url(#close_svg__b)" },
                x.createElement("path", {
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                  d: "m12 13.06 3.712 3.713 1.06-1.06L13.06 12l3.713-3.712-1.061-1.06-3.713 3.711-3.712-3.712-1.06 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061Z",
                  fill: "#1E1E1E",
                })
              )
            )),
          Dn ||
            (Dn = x.createElement(
              "defs",
              null,
              x.createElement(
                "clipPath",
                { id: "close_svg__a" },
                x.createElement("rect", {
                  width: 24,
                  height: 24,
                  rx: 2,
                  fill: "#fff",
                })
              ),
              x.createElement(
                "clipPath",
                { id: "close_svg__b" },
                x.createElement("rect", {
                  width: 24,
                  height: 24,
                  rx: 2,
                  fill: "#fff",
                })
              )
            ))
        );
      };
    function Nn() {
      return (
        (Nn = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        Nn.apply(this, arguments)
      );
    }
    var zn = function (e) {
      return x.createElement(
        "svg",
        Nn(
          {
            width: 36,
            height: 37,
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e
        ),
        Un ||
          (Un = x.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M18 .902c-9.941 0-18 8.059-18 18s8.059 18 18 18h15.366A2.634 2.634 0 0 0 36 34.268V18.902c0-9.941-8.059-18-18-18Zm-.913 17.877c-.336.588-.504 1.286-.504 2.092v.832h3.326v-.404c0-.587.101-1.075.303-1.461.218-.387.613-.849 1.184-1.386.723-.689 1.269-1.344 1.638-1.966.37-.621.555-1.369.555-2.243 0-.89-.236-1.696-.706-2.419-.454-.739-1.092-1.319-1.915-1.739-.823-.42-1.764-.63-2.823-.63-1.41 0-2.587.395-3.528 1.185-.924.773-1.545 1.697-1.864 2.772l2.898 1.21a3.278 3.278 0 0 1 .907-1.462c.437-.403.991-.605 1.663-.605.638 0 1.15.185 1.537.555.387.352.58.79.58 1.31 0 .437-.118.823-.353 1.16-.218.335-.58.73-1.084 1.184-.856.756-1.461 1.428-1.814 2.015Zm-.428 8.644c.436.42.957.63 1.562.63.605 0 1.117-.21 1.537-.63.42-.437.63-.957.63-1.562 0-.605-.21-1.117-.63-1.538-.42-.42-.932-.63-1.537-.63-.605 0-1.126.21-1.562.63-.42.42-.63.933-.63 1.538 0 .604.21 1.125.63 1.562Z",
            fill: "#196BDE",
          }))
      );
    };
    const Gn = (e) => {
      let { onClose: t } = e;
      return (
        (0, i.useEffect)(() => {
          const e = dn();
          Xn(e);
        }, []),
        (0, i.createElement)(
          "div",
          { className: "modal" },
          (0, i.createElement)(
            "div",
            { className: "modal-header" },
            (0, i.createElement)(
              "h3",
              { className: "heading" },
              (0, i.createElement)(
                "span",
                { className: "icon" },
                (0, i.createElement)(zn, null)
              ),
              (0, T.__)("Help Center", "wp-module-help-center")
            ),
            (0, i.createElement)(
              "button",
              { className: "close-button", onClick: t },
              (0, i.createElement)(
                "div",
                { className: "icon-button" },
                (0, i.createElement)(Bn, null)
              )
            )
          ),
          (0, i.createElement)(xn, { closeHelp: t })
        )
      );
    };
    var Fn;
    function Qn() {
      return (
        (Qn = Object.assign
          ? Object.assign.bind()
          : function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r)
                  Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
              return e;
            }),
        Qn.apply(this, arguments)
      );
    }
    var Wn = function (e) {
      return x.createElement(
        "svg",
        Qn(
          {
            style: { verticalAlign: "middle", cursor: "pointer" },
            width: 22,
            height: 22,
            viewBox: "0 1 36 37",
            xmlns: "http://www.w3.org/2000/svg",
          },
          e
        ),
        Fn ||
          (Fn = x.createElement("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M18 .902c-9.941 0-18 8.059-18 18s8.059 18 18 18h15.366A2.634 2.634 0 0 0 36 34.268V18.902c0-9.941-8.059-18-18-18Zm-.913 17.877c-.336.588-.504 1.286-.504 2.092v.832h3.326v-.404c0-.587.101-1.075.303-1.461.218-.387.613-.849 1.184-1.386.723-.689 1.269-1.344 1.638-1.966.37-.621.555-1.369.555-2.243 0-.89-.236-1.696-.706-2.419-.454-.739-1.092-1.319-1.915-1.739-.823-.42-1.764-.63-2.823-.63-1.41 0-2.587.395-3.528 1.185-.924.773-1.545 1.697-1.864 2.772l2.898 1.21a3.278 3.278 0 0 1 .907-1.462c.437-.403.991-.605 1.663-.605.638 0 1.15.185 1.537.555.387.352.58.79.58 1.31 0 .437-.118.823-.353 1.16-.218.335-.58.73-1.084 1.184-.856.756-1.461 1.428-1.814 2.015Zm-.428 8.644c.436.42.957.63 1.562.63.605 0 1.117-.21 1.537-.63.42-.437.63-.957.63-1.562 0-.605-.21-1.117-.63-1.538-.42-.42-.932-.63-1.537-.63-.605 0-1.126.21-1.562.63-.42.42-.63.933-.63 1.538 0 .604.21 1.125.63 1.562Z",
          }))
      );
    };
    o()(() => {
      window?.nfdHelpCenter?.restUrl &&
        (async ({
          namespace: e,
          urls: { single: t, batch: r } = {},
          settings: {
            debounce: { time: n } = {},
            queue: { threshold: i = 100 } = {},
          } = {},
        }) => {
          !e ||
            (!O(e) &&
              ((!t && !r) ||
                ((0, u.dispatch)(R).initializeNamespace(e),
                (0, u.dispatch)(R).updateHiiveUrls({ single: t, batch: r }, e),
                (0, u.dispatch)(R).updateHiiveDebounceTime(n, e),
                (0, u.dispatch)(R).updateHiiveEventsQueueThreshold(i, e),
                window.nfdUIAnalytics?.hiive
                  ? (window.nfdUIAnalytics.hiive[e] = !0)
                  : (window.nfdUIAnalytics = { hiive: { [e]: !0 } }))));
        })({
          namespace: "nfd-help-center",
          urls: {
            single: window.nfdHelpCenter.restUrl + "/newfold-data/v1/events",
          },
        });
    });
    const Cn = document.getElementById("wpcontent"),
      Xn = (e) => {
        Cn.classList.toggle("wpcontent-container", e),
          document
            .getElementById("nfd-help-center")
            .classList.toggle("help-container", e),
          ((e) => {
            localStorage.setItem("helpVisible", e ? "true" : "false");
          })(e);
      };
    (window.newfoldEmbeddedHelp = {}),
      (window.newfoldEmbeddedHelp.toggleNFDLaunchedEmbeddedHelp = () => {
        const e = dn();
        if (Object.is(e, void 0)) return Xn(!0), void pn("page", "opened");
        Xn(!e), pn("page", "closed");
      }),
      (window.newfoldEmbeddedHelp.toggleNFDUnlaunchedEmbeddedHelp =
        function () {
          let e = document.getElementById("nfd-help-center");
          Cn.removeChild(e), newfoldEmbeddedHelp.renderEmbeddedHelp();
        }),
      (0, c.registerPlugin)("nfd-help-panel", {
        render: () => {
          const [e, t] = (0, i.useState)(!1);
          return (
            (0, i.useEffect)(() => {
              (async () => {
                try {
                  const e = await CapabilityAPI.getHelpCenterCapability();
                  t(e);
                } catch (e) {
                  t(!1);
                }
              })();
            }, []),
            e
              ? (0, i.createElement)(
                  a.PluginSidebar,
                  {
                    name: "nfd-help-sidebar",
                    className: "nfd-plugin-sidebar",
                    title: "Help Center",
                    icon: (0, i.createElement)(Wn, null),
                  },
                  (0, i.createElement)(xn, null)
                )
              : (0, i.createElement)(i.Fragment, null)
          );
        },
      }),
      (window.newfoldEmbeddedHelp.renderEmbeddedHelp = function () {
        let e = document.createElement("div");
        (e.id = "nfd-help-center"),
          (e.style.display = "none"),
          Cn.appendChild(e);
        const t = document.getElementById("nfd-help-center");
        (0, i.render)(
          (0, i.createElement)(Gn, {
            onClose: () => {
              Xn(!1);
            },
          }),
          t
        );
      }),
      newfoldEmbeddedHelp.renderEmbeddedHelp();
  })();
})();
