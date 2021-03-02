import { ExportParams, PackageFileParams } from "@ag-grid-community/core";
import { BaseCreatorBeans, GridSerializingSession } from "./interfaces";
export declare abstract class BaseCreator<T, S extends GridSerializingSession<T>, P extends ExportParams<T>> {
    private beans;
    protected setBeans(beans: BaseCreatorBeans): void;
    abstract export(userParams?: P): string;
    protected getFileName(fileName?: string): string;
    protected getMergedParamsAndData(userParams?: P): {
        mergedParams: P;
        data: string;
    };
    private mergeDefaultParams;
    protected packageFile(params: PackageFileParams<P>): Blob;
    abstract createSerializingSession(params?: P): S;
    abstract getMimeType(): string;
    abstract getDefaultFileName(): string;
    abstract getDefaultFileExtension(): string;
    abstract isExportSuppressed(): boolean;
}