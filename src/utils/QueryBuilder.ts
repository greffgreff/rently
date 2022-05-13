export default class QueryBuilder {
  private base: string = ''
  private queryParameters: Map<string, any> = new Map()
  private pathVariables: string[] = []

  private constructor(base: string) {
    this.base = base
  }

  public static of(base: string): QueryBuilder {
    return new QueryBuilder(base)
  }

  public addParam(key: string, value: any): QueryBuilder {
    if (key === '' || key == null) {
      throw new Error('Query parameter cannot be null or an empty string.')
    }
    if (this.queryParameters.has(key)) {
      this.queryParameters.delete(key)
    }
    this.queryParameters.set(key, value)
    return this
  }

  public addParams(queryParameters: Map<string, any>): QueryBuilder {
    queryParameters.forEach((param) => {
      this.addParam(param.getKey(), param.getValue())
    })
    return this
  }

  public addPathVar(variable: string): QueryBuilder {
    this.pathVariables.push(variable)
    return this
  }

  public create(): string {
    let uri: string = this.base

    this.pathVariables.forEach((path) => {
      if (path !== '' || path != null) uri += '/' + path
    })

    if (!this.queryParameters.size) {
      let parsedParams: string[] = []

      this.queryParameters.forEach((param) => {
        if (param[1] != null) {
          parsedParams.push(param[0] + '=' + param[1])
        }
      })

      uri += '?' + parsedParams.join('&')
    }

    return uri
  }
}
