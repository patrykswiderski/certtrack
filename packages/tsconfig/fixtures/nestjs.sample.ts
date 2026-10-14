function Marker(): ClassDecorator {
  return () => undefined;
}

@Marker()
export class SampleService {
  public describe(): string {
    return "sample";
  }
}
