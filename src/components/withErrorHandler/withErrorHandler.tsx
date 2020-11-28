// import React, { ComponentType, useEffect, useState } from "react";
// import Modal from "../../components/UI/Modal/Modal";
// import { AxiosInstance } from "axios";

// const withErrorHandler = (
//   WrappedComponent: ComponentType,
//   axios: AxiosInstance
// ) => {
//   return (props: any) => {
//     const [error, setError] = useState<boolean>(false);

//     useEffect(() => {
//       const reqInterceptor = axios.interceptors.request.use(
//         (req) => {
//           setError(true);
//           return req;
//         },
//         (error) => {
//           setError(true);
//           return Promise.reject(error);
//         }
//       );
//       const resInterceptor = axios.interceptors.response.use(
//         (res) => {
//           return res;
//         },
//         (error) => {
//           console.log(error);
// setError(error);
//           return Promise.reject(error);
//         }
//       );
//       // console.log(reqInterceptor, resInterceptor); ==> when returns 0 means the initialization was successful.

//       return () => {
//         axios.interceptors.request.eject(reqInterceptor);
//         axios.interceptors.response.eject(resInterceptor);
//       };
//     }, [error]);

//     console.info(error);
//     const errorConfirmedHandler = () => {
//       setError(false);
//     };
//     return (
//       <>
//         <Modal show={error} modalClosed={errorConfirmedHandler}>
//           <p>{error ? <p>error occured!</p> : null}</p>
//         </Modal>
//         <WrappedComponent {...props} />
//       </>
//     );
//   };
// };

// // withErrorHandler.name = withErrorHandler;

// export default withErrorHandler;
import React, { Component, ComponentType } from "react";
import { AxiosInstance } from "axios";
import Modal from "../../components/UI/Modal/Modal";

type _state = {
  error: {
    has: boolean;
    message?: string;
  };
};
const withErrorHandler = (
  WrappedComponent: ComponentType,
  axios: AxiosInstance
) => {
  return class extends Component {
    private reqInterceptor: any;
    private resInterceptor: any;

    // constructor(props: any) {
    //   super(props);
    //   this.state = {
    //     error: null,
    //   };
    // }

    state: _state = {
      error: { has: false, message: "" },
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: { has: false, message: "" } });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: { has: true, message: error.messages } });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: { has: false, message: "" } });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error.has}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error.has ? <p>this.state.error.message</p> : <></>}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
