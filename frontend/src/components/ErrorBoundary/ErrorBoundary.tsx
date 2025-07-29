import React, { ErrorInfo, ReactNode } from 'react';
import { StyledContainer } from 'src/components/NotFound/styled';
import { Typography } from 'src/ui/Typography/Typography';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <StyledContainer>
          <Typography variant='h1' component='h1' sx={{ textAlign: 'center' }}>
            Ooops!
            <br />
            Что-то пошло не так
          </Typography>
        </StyledContainer>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
