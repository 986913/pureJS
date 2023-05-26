/**
  Have you ever used Express Middleware before?
  Middleware functions are functions with fixed interface that could be chained up like following two functions.
    app.use('/user/:id', function (req, res, next) {
      next()
    }, function (req, res, next) {
      next(new Error('sth wrong'))
    })
  
  You are asked to create simplified Middleware system:
    type Request = object
    type NextFunc =  (error?: any) => void
    type MiddlewareFunc = (req: Request, next: NextFunc) => void
    type ErrorHandler = (error: Error, req: Request, next: NextFunc) => void

    class Middleware {
      use(func: MiddlewareFunc | ErrorHandler) {
        // do any async operations call next() to trigger next function
      }
      start(req: Request) {
        // trigger all functions with a req object
      }
    }
  Now we can do something similar with Express
    const middleware = new Middleware()
    middleware.use((req, next) => {
      req.a = 1
      next()
    })
    middleware.use((req, next) => {
      req.b = 2
      next()
    })
    middleware.use((req, next) => {
      console.log(req)
    })
    middleware.start({}) // {a: 1, b: 2}

  Notice that use() could also accept an ErrorHandler which has 3 arguments. 
  The error handler is triggered if next() is called with an extra argument or uncaught error happens, like following.
    const middleware = new Middleware()

    // throw an error at first function
    middleware.use((req, next) => {
      req.a = 1
      throw new Error('sth wrong') 
      // or `next(new Error('sth wrong'))`
    })

    // since error occurs, this is skipped
    middleware.use((req, next) => {
      req.b = 2
    })

    // since error occurs, this is skipped
    middleware.use((req, next) => {
      console.log(req)
    })

    // since error occurs, this is called
    middleware.use((error, req, next) => {
      console.log(error)
      console.log(req)
    })

    middleware.start({})
    // Error: sth wrong
    // {a: 1}
 */

/*-------------------- 用例测试 1 -------------------------*/
const middleware = new Middleware();
// (case1 : normal call and execution success)
middleware.use((req, next) => {
  req.a = 1;
  next();
});
// (case1 : normal call and execution success)
middleware.use((req, next) => {
  req.b = 2;
  next();
});
// (case1 : normal call and execution success)
middleware.use((req, next) => {
  console.log(req);
});
middleware.start({}); // {a: 1, b: 2}

/*-------------------- 用例测试 2 -------------------------*/
const middleware = new Middleware();
// throw an error at first function      (case2: normal call but throw error --> should Catch execution error when a function throw an error)
middleware.use((req, next) => {
  req.a = 1;
  throw new Error('sth wrong'); // or next(new Error('sth wrong'));
});
// since error occurs, this is skipped    (case3: normal call but skiped execution, because next has err)
middleware.use((req, next) => {
  req.b = 2;
});
// since error occurs, this is skipped    (case3: normal call but skiped execution, because next has err)
middleware.use((req, next) => {
  console.log(req);
});
// since error occurs, this is called     (case4: error call))
middleware.use((error, req, next) => {
  console.log(error);
  console.log(req);
});

middleware.start({}); // Error: sth wrong  {a: 1}

/* --------------------------- Code solution ------------------------------- */
class Middleware {
  constructor() {
    this.funcs = []; // Create a function queue to help with execution
    this.req = null;
  }

  /**
   * @param {MiddlewareFunc} func 参数是函数
   */
  use(func) {
    this.funcs.push(func); // Push the function into Queue
  }

  /**
   * @param {Request} req
   */
  start(req) {
    this.req = req; // 把参数req赋值给this.reqs
    this._next(); // Start the chain
  }

  _next = (err) => {
    const toExecute = this.funcs.shift(); // take out the function to execute from the queues

    try {
      // 2个参数时候是normal call
      if (toExecute.length === 2) {
        //case 1:  there is no error, execute the function with current request and next()
        if (!err) toExecute(this.req, this._next);
        //case 3: There is an error, then skip the execute function, call next
        else this._next(err);
      }

      //case4:  3个参数时候是 error call (i.e. an error handler)
      if (toExecute.length === 3) {
        toExecute(err, this.req, this._next);
      }
    } catch (e) {
      //case 2:  Catch execution error when a function throw an error
      this._next(e);
    }
  };
}
