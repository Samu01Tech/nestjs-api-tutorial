import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class EditBookmarkDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  link?: string;
}
