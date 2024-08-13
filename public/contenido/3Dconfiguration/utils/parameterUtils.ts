import { IParameterApi, ISessionApi } from "@shapediver/viewer";

export function getOrderedParameters(session: ISessionApi): IParameterApi<any>[] {
  return Object.values(session.parameters).sort(
    (a: IParameterApi<any>, b: IParameterApi<any>) =>
      (a.order ?? Infinity) - (b.order ?? Infinity)
  );
}

export function groupParameters(parameters: IParameterApi<any>[]): { [groupName: string]: IParameterApi<string>[] } {
  const groupedParameters: { [groupName: string]: IParameterApi<string>[] } = {};

  for (const param of parameters) {
    const typedParam = param as IParameterApi<string>;
    const groupName = typedParam.group?.name || typedParam.name;
    groupedParameters[groupName] = groupedParameters[groupName] || [];
    groupedParameters[groupName].push(typedParam);
  }

  return groupedParameters;
}