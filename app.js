const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const connectDB = require('./models/index');

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use( express.static("views") );

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  skip: (req, res) => {
    if (req.originalUrl === '/health-check') {
      return true
    } if (req.originalUrl.startsWith('/public/')) {
      return true
    }
    return false
  },
}))

app.use(express.json({
  limit: '50mb',
  extended: true,
}))
app.use(express.urlencoded({
  limit: '50mb',
  extended: false,
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
// app.use('/users', usersRouter)
// app.use('/seed', seedDataRouter)

// Health check endpoint
app.use('/health-check', (req, res, next) => {
  res.status(200)
    .send('Healthy')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
