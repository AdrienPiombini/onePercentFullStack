export interface Usecase<Input, Output> {
  execute(request?: Input): Promise<Output> | Output;
  canExecute?(identity: string, request?: Input): Promise<boolean> | boolean;
}

export type Input = {
  data?: unknown;
  userId?: string;
};

export type Output = {
  success: boolean;
  message?: string;
  error?: string;
};
