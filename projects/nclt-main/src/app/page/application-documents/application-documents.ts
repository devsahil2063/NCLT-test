import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-application-documents',
  imports: [CommonModule, CardModule, ButtonModule, DividerModule, ToastModule],
  providers: [MessageService],
  templateUrl: './application-documents.html',
  styleUrl: './application-documents.scss',
})
export class ApplicationDocuments {
  loanAgreementFiles: UploadedFile[] = [];
  accountStatementFiles: UploadedFile[] = [];
  boardResolutionFiles: UploadedFile[] = [];
  demandNoticesFiles: UploadedFile[] = [];
  ncltApplicationCopyFiles: UploadedFile[] = [];
  otherSupportingDocumentsFiles: UploadedFile[] = [];

  maxFileSize = 10485760; // 10MB in bytes

  constructor(private messageService: MessageService) { }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent, fileType: string): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files, fileType);
    }
  }

  onFileSelect(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files, fileType);
    }
  }

  handleFiles(files: FileList, fileType: string): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file size
      if (file.size > this.maxFileSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `File ${file.name} exceeds maximum size of 10MB`,
        });
        continue;
      }

      // Validate file type
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!validTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `File ${file.name} is not a valid format. Please upload PDF, DOC, or DOCX files.`,
        });
        continue;
      }

      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // Add file to appropriate array
      switch (fileType) {
        case 'loanAgreement':
          this.loanAgreementFiles = [uploadedFile]; // Single file only
          break;
        case 'accountStatement':
          this.accountStatementFiles = [uploadedFile]; // Single file only
          break;
        case 'boardResolution':
          this.boardResolutionFiles = [uploadedFile]; // Single file only
          break;
        case 'demandNotices':
          this.demandNoticesFiles.push(uploadedFile); // Multiple files
          break;
        case 'ncltApplicationCopy':
          this.ncltApplicationCopyFiles = [uploadedFile]; // Single file only
          break;
        case 'otherSupportingDocuments':
          this.otherSupportingDocumentsFiles.push(uploadedFile); // Multiple files
          break;
      }
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'File(s) uploaded successfully',
    });
  }

  removeFile(fileType: string, file: UploadedFile): void {
    switch (fileType) {
      case 'loanAgreement':
        this.loanAgreementFiles = this.loanAgreementFiles.filter(
          (f) => f.name !== file.name
        );
        break;
      case 'accountStatement':
        this.accountStatementFiles = this.accountStatementFiles.filter(
          (f) => f.name !== file.name
        );
        break;
      case 'boardResolution':
        this.boardResolutionFiles = this.boardResolutionFiles.filter(
          (f) => f.name !== file.name
        );
        break;
      case 'demandNotices':
        this.demandNoticesFiles = this.demandNoticesFiles.filter(
          (f) => f.name !== file.name
        );
        break;
      case 'ncltApplicationCopy':
        this.ncltApplicationCopyFiles = this.ncltApplicationCopyFiles.filter(
          (f) => f.name !== file.name
        );
        break;
      case 'otherSupportingDocuments':
        this.otherSupportingDocumentsFiles =
          this.otherSupportingDocumentsFiles.filter((f) => f.name !== file.name);
        break;
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Removed',
      detail: 'File removed successfully',
    });
  }

  onCancel(): void {
    // Clear all uploaded files
    this.loanAgreementFiles = [];
    this.accountStatementFiles = [];
    this.boardResolutionFiles = [];
    this.demandNoticesFiles = [];
    this.ncltApplicationCopyFiles = [];
    this.otherSupportingDocumentsFiles = [];

    this.messageService.add({
      severity: 'info',
      summary: 'Cancelled',
      detail: 'All uploads cleared',
    });
  }

  onUploadDocuments(): void {
    // Validate required documents
    if (
      this.loanAgreementFiles.length === 0 ||
      this.accountStatementFiles.length === 0 ||
      this.boardResolutionFiles.length === 0 ||
      this.ncltApplicationCopyFiles.length === 0
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please upload all required documents',
      });
      return;
    }

    // Upload logic here
    console.log('Uploading documents:', {
      loanAgreement: this.loanAgreementFiles,
      accountStatement: this.accountStatementFiles,
      boardResolution: this.boardResolutionFiles,
      demandNotices: this.demandNoticesFiles,
      ncltApplicationCopy: this.ncltApplicationCopyFiles,
      otherSupportingDocuments: this.otherSupportingDocumentsFiles,
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'All documents uploaded successfully',
    });
  }
}
