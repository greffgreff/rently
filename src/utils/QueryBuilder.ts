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
    if (key === '' || key == null || key == undefined) {
      throw new Error('Query parameter cannot be null or an empty string.')
    }
    if (value === '' || value == null || value == undefined || value === 'undefined') {
      return this
    }
    if (this.queryParameters.has(key)) {
      this.queryParameters.delete(key)
    }
    this.queryParameters.set(key, value)
    return this
  }

  public addParams(queryParameters: Map<string, any>): QueryBuilder {
    for (let [key, value] of queryParameters.entries()) {
      this.addParam(key, value)
    }
    return this
  }

  public addPathVar(variable: string): QueryBuilder {
    this.pathVariables.push(variable)
    return this
  }

  public createURLencoded(): string {
    let uri: string = this.base

    this.pathVariables.forEach((path) => {
      if (path !== '' || path != null) uri += '/' + path
    })

    if (!!this.queryParameters.size) {
      let parsedParams: string[] = []
      for (let [key, value] of this.queryParameters.entries()) {
        parsedParams.push(key + '=' + (value as string).replaceAll(' ', '%20'))
      }
      uri += '?' + parsedParams.join('&')
    }

    return uri
  }
}
