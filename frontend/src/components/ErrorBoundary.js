import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You could log this to an error reporting service
    // console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5">
          <div className="text-center">
            <h2>Something went wrong.</h2>
            <p className="text-muted">Please refresh the page or go back to the home page.</p>
            <a className="btn btn-primary" href="/">Go Home</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
