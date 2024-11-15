import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '@appointment-app-hdm/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private httpClient: HttpClient) {}
  getAll() {
    return this.httpClient.get<Branch[]>('/api/branches');
  }

  getById(id: number) {
    return this.httpClient.get<Branch>(`/api/branches/${id}`);
  }

  create(branch: Branch) {
    return this.httpClient.post<Branch>('/api/branches', { branch });
  }

  updateById(id: number, updateData: Partial<Branch>) {
    return this.httpClient.patch<Partial<Branch>>(`/api/branches/${id}`, {
      updateData,
    });
  }

  deleteById(id: number) {
    return this.httpClient.delete<void>(`/api/branches/${id}`);
  }
}
