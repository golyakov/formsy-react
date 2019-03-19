declare module "formsy-react" {
  export interface IWithFormsyProps {
    getErrorMessage(): string;
    getErrorMessages: any;
    getValue(): any;
    hasValue: any;
    isFormDisabled: any;
    isValid: any;
    isPristine: any;
    isFormSubmitted(): boolean;
    isRequired: any;
    isValidValue: any;
    resetValue: any;
    setValidations: any;
    setValue(value: any): void;
    showRequired(): boolean;
    showError(): boolean;
    innerRef: any;
    validationError: any;
    validationErrors: any[];
  }

  type ComponentClass<P> = React.ComponentClass<P>;
  type Component<P> = React.ComponentType<P>;

  // Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
  type Omit<T, K extends keyof T> = Pick<
    T,
    ({ [P in keyof T]: P } &
      { [P in K]: never } & { [x: string]: never; [x: number]: never })[keyof T]
  >;

  // Injects props and removes them from the prop requirements.
  // Will not pass through the injected props if they are passed in during
  // render. Also adds new prop requirements from TNeedsProps.
  export interface InferableComponentEnhancerWithProps<
    TInjectedProps,
    TNeedsProps
  > {
    <P extends TInjectedProps>(component: Component<P>): ComponentClass<
      Omit<P, keyof TInjectedProps> & TNeedsProps
    > & { WrappedComponent: Component<P> };
  }

  interface MapStateToProps<TStateProps, TOwnProps, State> {
    (state: State, ownProps: TOwnProps): TStateProps;
  }

  interface MapStateToPropsFactory<TStateProps, TOwnProps, State> {
    (initialState: State, ownProps: TOwnProps): MapStateToProps<
      TStateProps,
      TOwnProps,
      State
    >;
  }

  type MapStateToPropsParam<TStateProps, TOwnProps, State> =
    | MapStateToPropsFactory<TStateProps, TOwnProps, State>
    | MapStateToProps<TStateProps, TOwnProps, State>
    | null
    | undefined;

  export interface WithFormsy {
    <TOwnProps = {}, State = {}>(
      Component: Component<IWithFormsyProps>
    ): ComponentClass<
      Omit<IWithFormsyProps, keyof IWithFormsyProps> & TOwnProps
    > & {
      WrappedComponent: Component<IWithFormsyProps>;
    };
  }

  export const withFormsy: WithFormsy;

  var Form: any;
  export default Form;
}
