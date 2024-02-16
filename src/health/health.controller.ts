import { Controller, Get, HttpCode } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";

@ApiTags("Health")
@Controller()
export class HealthController {
  @Get()
  @HttpCode(HttpStatusCode.Ok)
  @ApiOkResponse({ description: "OK" })
  public run(): string {
    return "OK";
  }
}
