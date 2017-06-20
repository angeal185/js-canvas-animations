(->
  Loader = do ->
    `var Loader`

    Loader = ->
      @$loader = $('.loader')
      @$inc = $('.loader-increment')
      @$percent = $('.loader-percent')
      @$loader_text = $('.loader-text')
      @loaded = 0
      @increments = $.makeArray(@$inc)
      @loader_length = @increments.length
      @ratio = Math.round(100 / @loader_length)
      @current_inc = null
      @_load()
      return

    Loader::_load = ->
      loading = undefined
      loading = setInterval(((_this) ->
        ->
          if _this.loaded < 19999.9
            _this.loaded += .1
            _this._update_display()
          else
            _this.$loader_text.text 'Loaded'
            _this.$percent.text '100.0%'
      )(this), 10)

    Loader::_update_display = ->
      new_inc = undefined
      percent = undefined
      prepend = undefined
      percent = Math.round(@loaded * 10) / 10
      prepend = ''
      if @loaded < 10
        prepend = '  '
      else if @loaded < 100
        prepend = ' '
      else
        prepend = ''
      @$percent.text '' + prepend + percent + '%'
      new_inc = Math.round(@loaded / @ratio)
      if new_inc != @current_inc
        @current_inc = new_inc
        return $(@increments[@current_inc]).text('#')
      return

    Loader
  $ ->
    if window.App == null
      window.App = {}
    window.App.Loader = new Loader
  return
).call this