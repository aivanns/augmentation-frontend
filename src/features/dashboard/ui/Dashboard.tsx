import { useSocket } from '../../../shared/lib/hooks/useSocket';
import { dashboardSocket } from '../model/socket';
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { useRef, useState, useEffect } from 'react';
import { dashboardApi } from '../api/dashboard.api';
import { toast } from 'sonner';
import { MINIO_URL } from '../../../shared/constants';

const Dashboard = () => {
    useSocket();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [count, setCount] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    useEffect(() => {
        dashboardSocket.onResult((result) => {
            toast.success('Аугментация успешно завершена!');
            
            if (result) {
                const url = result.replace('http://minio:9000', MINIO_URL);
                setDownloadUrl(url);
                window.location.href = url;
            }
        });

        dashboardSocket.onError((error) => {
            toast.error('Произошла ошибка при обработке');
            console.log(error);
        });

        return () => {
            dashboardSocket.offResult();
            dashboardSocket.offError();
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.name.endsWith('.zip')) {
                setFile(selectedFile);
            } else {
                toast.error('Пожалуйста, выберите ZIP архив');
            }
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            toast.error('Пожалуйста, выберите файл');
            return;
        }
        
        setIsLoading(true);
        try {
            await dashboardApi.uploadFile(file, count);
            toast.success('Файл успешно загружен');
        } catch (error) {
            toast.error('Ошибка при загрузке файла');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl min-h-[calc(100vh-64px)] flex items-center justify-center">
            <Card className="w-full">
                <CardHeader className="flex flex-col gap-1 px-6 py-4">
                    <h1 className="text-xl font-bold">Загрузка изображений</h1>
                    <p className="text-small text-default-500">
                        Загрузите ZIP архив с изображениями для аугментации
                    </p>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <div 
                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-default-100 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".zip"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Upload className="w-8 h-8 mx-auto mb-2 text-default-500" />
                        <p className="text-default-500">
                            {file ? file.name : 'Нажмите или перетащите ZIP архив сюда'}
                        </p>
                    </div>
                    
                    <Input
                        type="number"
                        label="Количество аугментаций"
                        value={count.toString()}
                        onChange={(e) => setCount(Number(e.target.value))}
                        min={1}
                        max={10}
                    />
                    
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                        isLoading={isLoading}
                        className="w-full"
                    >
                        Загрузить и начать аугментацию
                    </Button>
                    
                    {downloadUrl && (
                        <p className="text-center text-small">
                            <a href={downloadUrl} className="text-primary hover:underline">
                                Нажмите сюда, если загрузка не началась
                            </a>
                        </p>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Dashboard;